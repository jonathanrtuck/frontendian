import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { APPLICATION_FILE_MANAGER } from "@/applications";
import {
  DEFAULT_WINDOW,
  DEFAULT_WINDOW_POSITION_INCREMENT,
  DEFAULT_WINDOW_POSITION_OFFSET,
  DESKBAR_ID,
  INITIAL_STATE,
  IS_DEBUG_MODE,
  WINDOW_DIMENSION_BUFFER,
  UNTITLED_WINDOW_TITLE,
} from "@/constants";
import * as themes from "@/themes";
import { ID, Pixels, State, Window } from "@/types";

type ActionIds = { id: ID } | { ids: ID[] };

export const useStore = create<State>()(() => INITIAL_STATE);

const getFirstOpenWindowPosition = (windows: Window[]): Pixels => {
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

const setState =
  <T>(
    actionType: string,
    updater: (payload: T) => (prevState: State) => State
  ) =>
  (payload: T): void => {
    if (IS_DEBUG_MODE) {
      /* eslint-disable no-console */
      console.groupCollapsed(actionType);

      if (payload) {
        console.debug(payload);
      }
      /* eslint-enable no-console */
    }

    useStore.setState(updater(payload));

    if (IS_DEBUG_MODE) {
      /* eslint-disable no-console */
      console.debug(useStore.getState());
      console.groupEnd();
      /* eslint-enable no-console */
    }
  };

export const blurWindow = setState<ActionIds>(
  "blurWindow",
  (payload) => (prevState) => ({
    ...prevState,
    windows: prevState.windows.map((window) =>
      isPayloadId(payload, window.id)
        ? {
            ...window,
            focused: false,
          }
        : window
    ),
  })
);

export const changeTheme = setState<ActionIds>(
  "changeTheme",
  (payload) => (prevState) => ({
    ...prevState,
    theme:
      Object.values(themes).find((theme) => isPayloadId(payload, theme.id)) ??
      prevState.theme,
  })
);

export const closeApplication = setState<ActionIds>(
  "closeApplication",
  (payload) => (prevState) =>
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
            (id) =>
              id === APPLICATION_FILE_MANAGER.id || !isPayloadId(payload, id)
          ),
          stackingOrder: prevState.stackingOrder.filter(
            (id) => !windowIds.includes(id)
          ),
          windows: prevState.windows.filter(
            ({ id }) => !windowIds.includes(id)
          ),
        }),
        prevState
      )
);

export const closeWindow = setState<ActionIds>(
  "closeWindow",
  (payload) => (prevState) =>
    prevState.windows
      .filter(({ id }) => isPayloadId(payload, id))
      .reduce((prevState, { id }) => {
        const windowApplication = prevState.applications.find(({ windowIds }) =>
          windowIds.includes(id)
        );
        const isLastApplicationWindow =
          windowApplication?.windowIds.length === 1;
        const isTracker = windowApplication?.id === APPLICATION_FILE_MANAGER.id;

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

export const collapseWindow = setState<ActionIds>(
  "collapseWindow",
  (payload) => (prevState) => ({
    ...prevState,
    windows: prevState.windows.map((window) =>
      isPayloadId(payload, window.id)
        ? {
            ...window,
            collapsed: true,
          }
        : window
    ),
  })
);

export const expandWindow = setState<ActionIds>(
  "expandWindow",
  (payload) => (prevState) => ({
    ...prevState,
    windows: prevState.windows.map((window) =>
      isPayloadId(payload, window.id)
        ? {
            ...window,
            collapsed: false,
          }
        : window
    ),
  })
);

export const focusDeskbar = setState<void>(
  "focusDeskbar",
  () => (prevState) => ({
    ...prevState,
    stackingOrder: [
      ...prevState.stackingOrder.filter((id) => id !== DESKBAR_ID),
      DESKBAR_ID,
    ],
    windows: prevState.windows.map((window) => ({
      ...window,
      focused: false,
    })),
  })
);

export const focusWindow = setState<ActionIds>(
  "focusWindow",
  (payload) => (prevState) => ({
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
  })
);

export const hideWindow = setState<ActionIds>(
  "hideWindow",
  (payload) => (prevState) => ({
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
  })
);

export const moveWindow = setState<ActionIds & { left: Pixels; top: Pixels }>(
  "moveWindow",
  (payload) => (prevState) => ({
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
  })
);

export const moveWindowTitlebar = setState<ActionIds & { left: Pixels }>(
  "moveWindowTitlebar",
  (payload) => (prevState) => ({
    ...prevState,
    windows: prevState.windows.map((window) =>
      isPayloadId(payload, window.id)
        ? {
            ...window,
            titlebarLeft: payload.left,
          }
        : window
    ),
  })
);

export const openApplication = setState<ActionIds>(
  "openApplication",
  (payload) => (prevState) =>
    prevState.applications
      .filter(({ id }) => isPayloadId(payload, id))
      .reduce((state, { id, getWindow, windowIds }) => {
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
        const window: Window = {
          ...DEFAULT_WINDOW,
          title: UNTITLED_WINDOW_TITLE,
          ...(getWindow?.() ?? {}),
          id: windowId,
          left: windowPosition,
          top: windowPosition,
        };

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
            : [...state.openApplicationIds, id],
          stackingOrder: [...state.stackingOrder, window.id],
          windows: [
            ...state.windows.map((window) => ({
              ...window,
              focused: false,
            })),
            window,
          ],
        };
      }, prevState)
);

export const openFile = setState<ActionIds & { windowId?: ID }>(
  "openFile",
  (payload) => (prevState) =>
    prevState.files
      .filter(({ id }) => isPayloadId(payload, id))
      .reduce((state, file) => {
        const fileWindow = state.windows.find(
          ({ fileId }) => fileId === file.id
        );

        // if the file is already open, unhide and/or focus its window
        if (fileWindow) {
          if (fileWindow.hidden) {
            return {
              ...state,
              stackingOrder: [
                ...state.stackingOrder.filter((id) => id !== fileWindow.id),
                fileWindow.id,
              ],
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

        const applicationId = state.types[file.type]?.application;

        if (!applicationId) {
          return state;
        }

        const application = state.applications.find(
          ({ id }) => id === applicationId
        );
        const existingWindow = state.windows.find(
          ({ id }) => id === payload.windowId
        );

        // if opening file in an existing window
        if (existingWindow) {
          return {
            ...state,
            stackingOrder: [
              ...state.stackingOrder.filter((id) => id !== existingWindow.id),
              existingWindow.id,
            ],
            windows: state.windows.map((window) =>
              window.id === existingWindow.id
                ? {
                    ...window,
                    title: file.title,
                    ...(application?.getWindow?.(file) ?? {}),
                    fileId: file.id,
                    focused: true,
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
        const window: Window = {
          ...DEFAULT_WINDOW,
          title: file.title,
          ...(application?.getWindow?.(file) ?? {}),
          fileId: file.id,
          id: windowId,
          left: windowPosition,
          top: windowPosition,
        };

        // open application and file window
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
          stackingOrder: [...state.stackingOrder, window.id],
          windows: [
            ...state.windows.map((window) => ({
              ...window,
              focused: false,
            })),
            window,
          ],
        };
      }, prevState)
);

export const openWindow = setState<ActionIds>(
  "openWindow",
  (payload) => (prevState) =>
    prevState.applications
      .filter(({ id }) => isPayloadId(payload, id))
      .reduce((state, { getWindow, id }) => {
        const isApplicationOpen = state.openApplicationIds.includes(id);
        const windowId = uuid();
        const windowPosition = getFirstOpenWindowPosition(state.windows);
        const window: Window = {
          ...DEFAULT_WINDOW,
          title: UNTITLED_WINDOW_TITLE,
          ...(getWindow?.() ?? {}),
          id: windowId,
          left: windowPosition,
          top: windowPosition,
        };

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
          stackingOrder: [...state.stackingOrder, window.id],
          windows: [
            ...state.windows.map((window) => ({
              ...window,
              focused: false,
            })),
            window,
          ],
        };
      }, prevState)
);

export const resizeWindow = setState<
  ActionIds & { height: Pixels; width: Pixels }
>("resizeWindow", (payload) => (prevState) => ({
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

export const showWindow = setState<ActionIds>(
  "showWindow",
  (payload) => (prevState) => ({
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
  })
);

// @see https://asleson.org/public/mirrors/www.be.com/documentation/be_book/The%20Interface%20Kit/Window.html#Zoom()
export const zoomWindow = setState<ActionIds>(
  "zoomWindow",
  (payload) => (prevState) => ({
    ...prevState,
    windows: prevState.windows.map((window) => {
      if (!isPayloadId(payload, window.id)) {
        return window;
      }

      const element = document.getElementById(window.id)!;
      const { offsetHeight, offsetWidth } = element;
      const { marginBottom, marginLeft, marginRight, marginTop } =
        getComputedStyle(element);
      const marginX = parseFloat(marginLeft) + parseFloat(marginRight);
      const marginY = parseFloat(marginBottom) + parseFloat(marginTop);
      const frameHeight = offsetHeight + marginY - window.height;
      const frameWidth = offsetWidth + marginX - window.width;
      const deskbarHeight =
        prevState.theme.id === "theme-mac-os-classic"
          ? document.getElementById(DESKBAR_ID)!.offsetHeight
          : 0;
      const maxHeight =
        document.body.offsetHeight - frameHeight - deskbarHeight;
      const maxWidth = document.body.offsetWidth - frameWidth;
      const isZoomed =
        window.height >= maxHeight - WINDOW_DIMENSION_BUFFER &&
        window.height <= maxHeight + WINDOW_DIMENSION_BUFFER &&
        window.width >= maxWidth - WINDOW_DIMENSION_BUFFER &&
        window.width <= maxWidth + WINDOW_DIMENSION_BUFFER;

      return isZoomed
        ? {
            ...window,
            ...window.prev,
            prev: window.zoomed ? window.prev : undefined,
            zoomed: false,
          }
        : {
            ...window,
            height: maxHeight,
            left: 0,
            prev: {
              height: window.height,
              left: window.left,
              top: window.top,
              width: window.width,
            },
            top: deskbarHeight,
            width: maxWidth,
            zoomed: true,
          };
    }),
  })
);
