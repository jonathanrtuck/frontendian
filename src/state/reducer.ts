import { v4 as uuid } from "uuid";

import {
  APPLICATION_TRACKER,
  DEFAULT_WINDOW,
  UNTITLED_WINDOW_TITLE,
} from "./constants";
import { Action, State } from "./types";
import { getFirstOpenWindowPosition } from "./utils";

export const stateReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "BLUR":
      return {
        ...state,
        windows: state.windows.map((window) =>
          action.payload.ids.includes(window.id)
            ? {
                ...window,
                focused: false,
              }
            : window
        ),
      };
    case "CLOSE":
      switch (action.payload.type) {
        case "application":
          return action.payload.ids.reduce((prevState: State, id) => {
            const application = prevState.applications.find(
              (application) => application.id === id
            );
            const isTracker = application?.id === APPLICATION_TRACKER.id;
            const windowIds = application?.windowIds ?? [];

            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application.id === id
                  ? {
                      ...application,
                      windowIds: [],
                    }
                  : application
              ),
              openApplicationIds: !isTracker
                ? prevState.openApplicationIds.filter(
                    (applicationId) => applicationId !== id
                  )
                : prevState.openApplicationIds,
              stackingOrder: prevState.stackingOrder.filter(
                (windowId) => windowId !== id
              ),
              windows: prevState.windows.filter(
                (window) => !windowIds.includes(window.id)
              ),
            };
          }, state);
        case "window":
          return action.payload.ids.reduce((prevState: State, id) => {
            const applicationWithWindow = prevState.applications.find(
              ({ windowIds }) => windowIds.includes(id)
            );
            const isLastApplicationWindow =
              applicationWithWindow?.windowIds.length === 1;
            const isTracker =
              applicationWithWindow?.id === APPLICATION_TRACKER.id;

            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application === applicationWithWindow
                  ? {
                      ...application,
                      windowIds: application.windowIds.filter(
                        (windowId) => windowId !== id
                      ),
                    }
                  : application
              ),
              openApplicationIds:
                isLastApplicationWindow && !isTracker
                  ? prevState.openApplicationIds.filter(
                      (applicationId) =>
                        applicationId !== applicationWithWindow?.id
                    )
                  : prevState.openApplicationIds,
              stackingOrder: prevState.stackingOrder.filter(
                (windowId) => windowId !== id
              ),
              windows: prevState.windows.filter((window) => window.id !== id),
            };
          }, state);
        default:
          return state;
      }
    case "FOCUS":
    case "SHOW":
      return {
        ...state,
        stackingOrder: [
          ...state.stackingOrder.filter(
            (id) => !action.payload.ids.includes(id)
          ),
          ...action.payload.ids,
        ],
        windows: state.windows.map((window) =>
          action.payload.ids.includes(window.id)
            ? {
                ...window,
                focused: true,
                hidden: false,
              }
            : window
        ),
      };
    case "HIDE":
      return {
        ...state,
        stackingOrder: [
          ...action.payload.ids,
          ...state.stackingOrder.filter(
            (id) => !action.payload.ids.includes(id)
          ),
        ],
        windows: state.windows.map((window) =>
          action.payload.ids.includes(window.id)
            ? {
                ...window,
                focused: false,
                hidden: true,
              }
            : window
        ),
      };
    case "MOVE":
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (action.payload.ids.includes(window.id)) {
            switch (action.payload.type) {
              case "header":
                return {
                  ...window,
                  headerX: action.payload.x,
                };
              case "window":
                return {
                  ...window,
                  x: action.payload.x,
                  y: action.payload.y,
                };
              default:
                return window;
            }
          }

          return window;
        }),
      };
    case "OPEN":
      switch (action.payload.type) {
        case "application":
          return action.payload.ids.reduce((prevState: State, id) => {
            const application = state.applications.find(
              (application) => application.id === id
            );

            if (!application) {
              return prevState;
            }

            const isApplicationOpen = prevState.openApplicationIds.includes(id);

            // if the application is already open, raise and focus its first visible window
            if (isApplicationOpen) {
              const firstVisibleWindow = application.windowIds
                .map((id) => state.windows.find((window) => window.id === id))
                .find((window) => window && !window.hidden);

              if (firstVisibleWindow) {
                return {
                  ...prevState,
                  stackingOrder: [
                    ...state.stackingOrder.filter(
                      (id) => id !== firstVisibleWindow.id
                    ),
                    firstVisibleWindow.id,
                  ],
                  windows: state.windows.map((window) => ({
                    ...window,
                    focused: window.id === firstVisibleWindow.id,
                  })),
                };
              }

              return prevState;
            }

            const window = application?.getWindow?.();
            const windowId = uuid();
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );

            // open application and its initial window
            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application.id === id
                  ? {
                      ...application,
                      windowIds: [...application.windowIds, windowId],
                    }
                  : application
              ),
              openApplicationIds: isApplicationOpen
                ? prevState.openApplicationIds
                : [...prevState.openApplicationIds, id],
              windows: [
                ...prevState.windows.map((window) => ({
                  ...window,
                  focused: false,
                })),
                {
                  ...DEFAULT_WINDOW,
                  ...window,
                  focused: true,
                  id: windowId,
                  title:
                    window?.title ||
                    prevState.files.find((file) => file.id === window?.fileId)
                      ?.title ||
                    UNTITLED_WINDOW_TITLE,
                  x: windowPosition,
                  y: windowPosition,
                },
              ],
            };
          }, state);
        case "file":
          return action.payload.ids.reduce((prevState: State, id) => {
            const file = state.files.find((file) => file.id === id);

            if (!file) {
              return prevState;
            }

            const isFileOpen = state.windows.some(
              ({ fileId }) => fileId === file.id
            );

            // if the file is already open, unhide and/or focus its window
            if (isFileOpen) {
              const fileWindow = prevState.windows.find(
                (window) => window.fileId === file.id
              );

              if (fileWindow) {
                if (fileWindow.hidden) {
                  return {
                    ...prevState,
                    windows: prevState.windows.map((window) => ({
                      ...window,
                      focused: window.id === fileWindow.id,
                      hidden: window.hidden && window.id !== fileWindow.id,
                    })),
                  };
                } else {
                  return {
                    ...prevState,
                    stackingOrder: [
                      ...state.stackingOrder.filter(
                        (id) => id !== fileWindow.id
                      ),
                      fileWindow.id,
                    ],
                    windows: state.windows.map((window) => ({
                      ...window,
                      focused: window.id === fileWindow.id,
                    })),
                  };
                }
              }

              return prevState;
            }

            const applicationId = state.types[file.type]?.application;

            if (!applicationId) {
              return prevState;
            }

            const window = state.applications
              .find((application) => application.id === applicationId)
              ?.getWindow?.(file);
            const windowId = uuid();
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const isApplicationOpen =
              prevState.openApplicationIds.includes(applicationId);

            // open application and file window
            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application.id === applicationId
                  ? {
                      ...application,
                      windowIds: [...application.windowIds, windowId],
                    }
                  : application
              ),
              openApplicationIds: isApplicationOpen
                ? prevState.openApplicationIds
                : [...prevState.openApplicationIds, applicationId],
              windows: [
                ...prevState.windows.map((window) => ({
                  ...window,
                  focused: false,
                })),
                {
                  ...DEFAULT_WINDOW,
                  ...window,
                  fileId: file.id,
                  focused: true,
                  id: windowId,
                  title: window?.title || file.title || UNTITLED_WINDOW_TITLE,
                  x: windowPosition,
                  y: windowPosition,
                },
              ],
            };
          }, state);
        case "window":
          if ("applicationId" in action.payload) {
            const { applicationId } = action.payload;
            const application = state.applications.find(
              (application) => application.id === applicationId
            );

            if (!application) {
              return state;
            }

            const isApplicationOpen =
              state.openApplicationIds.includes(applicationId);
            const window = application?.getWindow?.();
            const windowId = uuid();
            const windowPosition = getFirstOpenWindowPosition(state.windows);

            return {
              ...state,
              applications: state.applications.map((application) =>
                application.id === applicationId
                  ? {
                      ...application,
                      windowIds: [...application.windowIds, windowId],
                    }
                  : application
              ),
              openApplicationIds: isApplicationOpen
                ? state.openApplicationIds
                : [...state.openApplicationIds, applicationId],
              windows: [
                ...state.windows.map((window) => ({
                  ...window,
                  focused: false,
                })),
                {
                  ...DEFAULT_WINDOW,
                  ...window,
                  focused: true,
                  id: windowId,
                  title: window?.title || UNTITLED_WINDOW_TITLE,
                  x: windowPosition,
                  y: windowPosition,
                },
              ],
            };
          }

          return state;
        default:
          return state;
      }
    case "RESIZE":
      return {
        ...state,
        windows: state.windows.map((window) =>
          action.payload.ids.includes(window.id)
            ? {
                ...window,
                height: action.payload.height,
                width: action.payload.width,
              }
            : window
        ),
      };
    case "TITLE":
      return {
        ...state,
        windows: state.windows.map((window) =>
          action.payload.ids.includes(window.id)
            ? {
                ...window,
                title: action.payload.value || UNTITLED_WINDOW_TITLE,
              }
            : window
        ),
      };
    case "UNZOOM":
      return {
        ...state,
        windows: state.windows.map((window) =>
          action.payload.ids.includes(window.id)
            ? {
                ...window,
                zoomed: false,
              }
            : window
        ),
      };
    case "ZOOM":
      return {
        ...state,
        windows: state.windows.map((window) =>
          action.payload.ids.includes(window.id)
            ? {
                ...window,
                zoomed: true,
              }
            : window
        ),
      };
    default:
      return state;
  }
};
