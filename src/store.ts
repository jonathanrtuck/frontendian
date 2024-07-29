import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { APPLICATION_TRACKER } from "@/applications";
import {
  DEFAULT_WINDOW,
  DEFAULT_WINDOW_POSITION_INCREMENT,
  DEFAULT_WINDOW_POSITION_OFFSET,
  INITIAL_STATE,
  UNTITLED_WINDOW_TITLE,
} from "@/constants";
import { ID, State, Window } from "@/types";

type ActionIds = { id: ID } | { ids: ID[] };

export const useStore = create<State>()(() => INITIAL_STATE);

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line no-console
  console.debug("store", useStore.getState());

  useStore.subscribe((state) => {
    // eslint-disable-next-line no-console
    console.debug("store", state);
  });
}

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

export const blurWindow = (payload: ActionIds): void =>
  useStore.setState((prevState) => ({
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

export const closeApplication = (payload: ActionIds): void =>
  useStore.setState((prevState) =>
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

export const closeWindow = (payload: ActionIds) =>
  useStore.setState((prevState) =>
    prevState.windows
      .filter(({ id }) => isPayloadId(payload, id))
      .reduce((prevState, { id }) => {
        const windowApplication = prevState.applications.find(({ windowIds }) =>
          windowIds.includes(id)
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

export const focusWindow = (payload: ActionIds) =>
  useStore.setState((prevState) => ({
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

export const hideWindow = (payload: ActionIds) =>
  useStore.setState((prevState) => ({
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

export const moveWindow = (
  payload: ActionIds & { left: number; top: number }
) =>
  useStore.setState((prevState) => ({
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

export const moveWindowTitlebar = (payload: ActionIds & { left: number }) =>
  useStore.setState((prevState) => ({
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

export const openApplication = (payload: ActionIds) =>
  useStore.setState((prevState) =>
    prevState.applications
      .filter(({ id }) => isPayloadId(payload, id))
      .reduce((state, { id, getWindow, title, windowIds }) => {
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
          title,
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

export const openFile = (payload: ActionIds & { windowId?: ID }) =>
  useStore.setState((prevState) =>
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
            windows: state.windows.map((window) =>
              window.id === existingWindow.id
                ? {
                    ...window,
                    title: application?.title ?? UNTITLED_WINDOW_TITLE,
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
          title: application?.title ?? UNTITLED_WINDOW_TITLE,
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

export const openWindow = (payload: ActionIds) =>
  useStore.setState((prevState) =>
    prevState.applications
      .filter(({ id }) => isPayloadId(payload, id))
      .reduce((state, { getWindow, id, title }) => {
        const isApplicationOpen = state.openApplicationIds.includes(id);
        const windowId = uuid();
        const windowPosition = getFirstOpenWindowPosition(state.windows);
        const window: Window = {
          ...DEFAULT_WINDOW,
          title,
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

export const resizeWindow = (
  payload: ActionIds & { height: number; width: number }
) =>
  useStore.setState((prevState) => ({
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

export const showWindow = (payload: ActionIds) =>
  useStore.setState((prevState) => ({
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

export const zoomWindow = (payload: ActionIds) =>
  useStore.setState((prevState) => ({
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
