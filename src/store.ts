import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { APPLICATION_TRACKER } from "@/applications";
import {
  DEFAULT_WINDOW_POSITION_INCREMENT,
  DEFAULT_WINDOW_POSITION_OFFSET,
  INITIAL_STATE,
} from "@/constants";
import { ActionIds, Actions, ID, State, Window } from "@/types";

const getFirstOpenWindowPosition = (windows: Window[]): number => {
  for (let i = 0; i !== windows.length; i++) {
    const position =
      DEFAULT_WINDOW_POSITION_OFFSET + i * DEFAULT_WINDOW_POSITION_INCREMENT;
    const isPositionOpen = windows.every(
      ({ left, top }) => left !== position || top !== position
    );

    if (isPositionOpen) {
      return position;
    }
  }

  return (
    DEFAULT_WINDOW_POSITION_OFFSET +
    windows.length * DEFAULT_WINDOW_POSITION_INCREMENT
  );
};

const isPayloadId = (payload: ActionIds, id: ID): boolean =>
  ("id" in payload && id === payload.id) ||
  ("ids" in payload && payload.ids.includes(id));

export const useStore = create<State & Actions>()((set) => ({
  ...INITIAL_STATE,

  blurWindow: (payload) => {
    set((prevState) => ({
      ...prevState,
      windows: prevState.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              focused: false,
            }
          : window
      ),
    }));
  },
  closeApplication: (payload) => {
    set((prevState) =>
      prevState.applications
        .filter(({ id }) => isPayloadId(payload, id))
        .reduce(
          (prevState, { id, windowIds }) => ({
            ...prevState,
            applications: prevState.applications.map((application) =>
              application.id === id
                ? {
                    ...application,
                    windowIds: [],
                  }
                : application
            ),
            openApplicationIds: prevState.openApplicationIds.filter(
              (id) => id === APPLICATION_TRACKER.id || !isPayloadId(payload, id)
            ),
            windows: prevState.windows.filter(
              ({ id }) => !windowIds.includes(id)
            ),
          }),
          prevState
        )
    );
  },
  closeWindow: (payload) => {
    set((prevState) =>
      prevState.windows
        .filter(({ id }) => isPayloadId(payload, id))
        .reduce((prevState, { id }) => {
          const windowApplication = prevState.applications.find(
            ({ windowIds }) => windowIds.includes(id)
          );
          const isLastApplicationWindow =
            windowApplication?.windowIds.length === 1;
          const isTracker = windowApplication?.id === APPLICATION_TRACKER.id;

          return {
            ...prevState,
            applications: prevState.applications.map((application) =>
              application === windowApplication
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
                    (id) => id !== windowApplication?.id
                  )
                : prevState.openApplicationIds,
            stackingOrder: prevState.stackingOrder.filter(
              (windowId) => windowId !== id
            ),
            windows: prevState.windows.filter((window) => window.id !== id),
          };
        }, prevState)
    );
  },
  focusWindow: (payload) => {
    set((prevState) => ({
      ...prevState,
      stackingOrder: [
        ...prevState.stackingOrder.filter((id) => !isPayloadId(payload, id)),
        ...("id" in payload ? [payload.id] : payload.ids),
      ],
      windows: prevState.windows.map((window) => ({
        ...window,
        focused: isPayloadId(payload, window.id),
        hidden: isPayloadId(payload, window.id) ? false : window.hidden,
      })),
    }));
  },
  hideWindow: (payload) => {
    set((prevState) => ({
      ...prevState,
      stackingOrder: [
        ...("id" in payload ? [payload.id] : payload.ids),
        ...prevState.stackingOrder.filter((id) => !isPayloadId(payload, id)),
      ],
      windows: prevState.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              focused: false,
              hidden: true,
            }
          : window
      ),
    }));
  },
  moveWindow: (payload) => {
    set((prevState) => ({
      ...prevState,
      windows: prevState.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              left: payload.left,
              top: payload.top,
            }
          : window
      ),
    }));
  },
  moveWindowTitlebar: (payload) => {
    set((prevState) => ({
      ...prevState,
      windows: prevState.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              titlebarLeft: payload.left,
            }
          : window
      ),
    }));
  },
  openApplication: (payload) => {
    set((prevState) =>
      prevState.applications
        .filter(({ id }) => isPayloadId(payload, id))
        .reduce((state, { id, windowIds }) => {
          const isApplicationOpen = state.openApplicationIds.includes(id);

          // if the application is already open, raise and focus its first visible window
          if (isApplicationOpen) {
            const firstVisibleWindow = windowIds
              .map((id) => state.windows.find((window) => window.id === id))
              .find((window) => window && !window.hidden);

            if (firstVisibleWindow) {
              return {
                ...state,
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

            return state;
          }

          const windowId = uuid();
          const windowPosition = getFirstOpenWindowPosition(state.windows);

          // open application and its initial window
          return {
            ...state,
            applications: state.applications.map((application) =>
              application.id === id
                ? {
                    ...application,
                    windowIds: [...application.windowIds, windowId],
                  }
                : application
            ),
            openApplicationIds: isApplicationOpen
              ? state.openApplicationIds
              : state.openApplicationIds.concat(
                  "id" in payload ? [payload.id] : payload.ids
                ),
            windows: [
              ...state.windows.map((window) => ({
                ...window,
                focused: false,
              })),
              {
                focused: true,
                height: 300, // @todo
                hidden: false,
                id: windowId,
                left: windowPosition,
                title: "Window…", // @todo
                titlebarLeft: 0,
                top: windowPosition,
                width: 480, // @todo
                zoomed: false,
              },
            ],
          };
        }, prevState)
    );
  },
  openFile: (payload) => {
    set((prevState) =>
      prevState.files
        .filter(({ id }) => isPayloadId(payload, id))
        .reduce((state, { id, type }) => {
          const fileWindow = state.windows.find(({ fileId }) => fileId === id);

          // if the file is already open, unhide and/or focus its window
          if (fileWindow) {
            if (fileWindow.hidden) {
              return {
                ...state,
                windows: state.windows.map((window) => ({
                  ...window,
                  focused: window.id === fileWindow.id,
                  hidden: window.hidden && window.id !== fileWindow.id,
                })),
              };
            }

            return {
              ...state,
              stackingOrder: [
                ...state.stackingOrder.filter((id) => id !== fileWindow.id),
                fileWindow.id,
              ],
              windows: state.windows.map((window) => ({
                ...window,
                focused: window.id === fileWindow.id,
              })),
            };
          }

          const applicationId = state.types[type]?.application;

          if (!applicationId) {
            return state;
          }

          const existingWindow = state.windows.find(
            ({ id }) => id === payload.windowId
          );

          // if opening file in an existing window
          if (existingWindow) {
            return {
              ...state,
              windows: state.windows.map((window) =>
                window.id === existingWindow.id
                  ? {
                      ...window,
                      fileId: id,
                      focused: true,
                      // @todo
                      /*
                      height: newWindow?.height ?? window.height,
                      title: newWindow?.title ?? window.title,
                      width: newWindow?.width ?? window.width,
                      */
                    }
                  : {
                      ...window,
                      focused: false,
                    }
              ),
            };
          }

          const isApplicationOpen =
            state.openApplicationIds.includes(applicationId);
          const windowId = uuid();
          const windowPosition = getFirstOpenWindowPosition(state.windows);

          // open application and file window
          return {
            ...state,
            applications: state.applications.map((application) =>
              application.id === id
                ? {
                    ...application,
                    windowIds: [...application.windowIds, windowId],
                  }
                : application
            ),
            openApplicationIds: isApplicationOpen
              ? state.openApplicationIds
              : state.openApplicationIds.concat(
                  "id" in payload ? [payload.id] : payload.ids
                ),
            windows: [
              ...state.windows.map((window) => ({
                ...window,
                focused: false,
              })),
              {
                fileId: id,
                focused: true,
                height: 300, // @todo
                hidden: false,
                id: windowId,
                left: windowPosition,
                title: "Window…", // @todo
                titlebarLeft: 0,
                top: windowPosition,
                width: 480, // @todo
                zoomed: false,
              },
            ],
          };
        }, prevState)
    );
  },
  openWindow: (payload) => {
    set((prevState) =>
      prevState.applications
        .filter(({ id }) => isPayloadId(payload, id))
        .reduce((state, { id }) => {
          const isApplicationOpen = state.openApplicationIds.includes(id);
          const windowId = uuid();
          const windowPosition = getFirstOpenWindowPosition(state.windows);

          return {
            ...state,
            applications: state.applications.map((application) =>
              application.id === id
                ? {
                    ...application,
                    windowIds: [...application.windowIds, windowId],
                  }
                : application
            ),
            openApplicationIds: isApplicationOpen
              ? state.openApplicationIds
              : [...state.openApplicationIds, id],
            windows: [
              ...state.windows.map((window) => ({
                ...window,
                focused: false,
              })),
              {
                focused: true,
                height: 300, // @todo
                hidden: false,
                id: windowId,
                left: windowPosition,
                title: "Window…", // @todo
                titlebarLeft: 0,
                top: windowPosition,
                width: 480, // @todo
                zoomed: false,
              },
            ],
          };
        }, prevState)
    );
  },
  resizeWindow: (payload) => {
    set((prevState) => ({
      ...prevState,
      windows: prevState.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              height: payload.height,
              width: payload.width,
            }
          : window
      ),
    }));
  },
  showWindow: (payload) => {
    set((prevState) => ({
      ...prevState,
      stackingOrder: [
        ...prevState.stackingOrder.filter((id) => !isPayloadId(payload, id)),
        ...("id" in payload ? [payload.id] : payload.ids),
      ],
      windows: prevState.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              focused: true,
              hidden: false,
            }
          : window
      ),
    }));
  },
  zoomWindow: (payload) => {
    set((prevState) => ({
      ...prevState,
      windows: prevState.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              zoomed: !window.zoomed,
            }
          : window
      ),
    }));
  },
}));
