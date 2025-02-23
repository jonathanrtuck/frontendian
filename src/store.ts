import * as applications from "@/applications";
import * as files from "@/files";
import { SYSTEM_BAR_ID } from "@/ids";
import type { Actions, Pixels, State, Window } from "@/types";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DEFAULT_WINDOW_POSITION_INCREMENT = 32;
const DEFAULT_WINDOW_POSITION_OFFSET = 96;
const DEFAULT_WINDOW: Window = {
  applicationId: "",
  collapsed: false,
  focused: true,
  height: 450,
  hidden: false,
  id: "",
  resizable: true,
  title: "Untitled",
  titlebar: {
    left: 0,
  },
  width: 600,
  x: DEFAULT_WINDOW_POSITION_OFFSET,
  y: DEFAULT_WINDOW_POSITION_OFFSET,
};
const WINDOW_DIMENSION_BUFFER = 12;

const getFirstOpenWindowPosition = (windows: Window[]): Pixels => {
  for (let i = 0; i !== windows.length; i++) {
    const position =
      DEFAULT_WINDOW_POSITION_OFFSET + i * DEFAULT_WINDOW_POSITION_INCREMENT;
    const isPositionOpen = windows.every(
      ({ x, y }) => x !== position || y !== position
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

export const useStore = create(
  devtools<State & Actions>(
    (set) => ({
      dialogs: [],
      expandedMenuitemIds: [],
      openApplicationIds: [applications.APPLICATION_FILE_MANAGER.id],
      stackingOrder: [SYSTEM_BAR_ID],
      windows: [],
      // eslint-disable-next-line sort-keys
      blurWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    focused: false,
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "blurWindow",
          }
        ),
      closeApplication: (payload) =>
        set(
          (prevState) => {
            const application = Object.values(applications).find(
              ({ id }) => id === payload.id
            );

            if (!application) {
              return prevState;
            }

            const applicationWindowIds = prevState.windows
              .filter(({ applicationId }) => applicationId === application.id)
              .map(({ id }) => id);

            return {
              openApplicationIds: prevState.openApplicationIds.filter(
                (id) =>
                  id === applications.APPLICATION_FILE_MANAGER.id ||
                  id !== payload.id
              ),
              stackingOrder: prevState.stackingOrder.filter(
                (id) => !applicationWindowIds.includes(id)
              ),
              windows: prevState.windows.filter(
                ({ id }) => !applicationWindowIds.includes(id)
              ),
            };
          },
          undefined,
          {
            payload,
            type: "closeApplication",
          }
        ),
      closeDialog: (payload) =>
        set(
          (prevState) => {
            const dialog = prevState.dialogs.find(
              ({ id }) => id === payload.id
            );

            if (!dialog) {
              return prevState;
            }

            const nextState = {
              dialogs: prevState.dialogs.filter(({ id }) => id !== payload.id),
            };

            const application = Object.values(applications).find(
              ({ id }) => id === dialog.applicationId
            );

            if (!application) {
              return nextState;
            }

            const applicationWindowIds = prevState.windows
              .filter(({ applicationId }) => applicationId === application.id)
              .map(({ id }) => id);

            if (applicationWindowIds.length === 0) {
              return nextState;
            }

            const highestWindowId = prevState.stackingOrder
              .toReversed()
              .find((id) => applicationWindowIds.includes(id));

            if (!highestWindowId) {
              return nextState;
            }

            return {
              ...nextState,
              stackingOrder: [
                ...prevState.stackingOrder.filter(
                  (id) => id !== highestWindowId
                ),
                highestWindowId,
              ],
              windows: prevState.windows.map((window) => ({
                ...window,
                focused: window.id === highestWindowId,
                hidden: window.hidden && window.id !== highestWindowId,
              })),
            };
          },
          undefined,
          {
            payload,
            type: "closeDialog",
          }
        ),
      closeWindow: (payload) =>
        set(
          (prevState) => {
            const window = prevState.windows.find(
              ({ id }) => id === payload.id
            );

            if (!window) {
              return prevState;
            }

            const application = Object.values(applications).find(
              ({ id }) => id === window.applicationId
            );

            if (!application) {
              return {
                stackingOrder: prevState.stackingOrder.filter(
                  (id) => id !== payload.id
                ),
                windows: prevState.windows.filter(
                  ({ id }) => id !== payload.id
                ),
              };
            }

            const applicationWindowIds = prevState.windows
              .filter(({ applicationId }) => applicationId === application.id)
              .map(({ id }) => id);
            const isLastApplicationWindow = applicationWindowIds.length === 1;
            const isFileManager =
              application.id === applications.APPLICATION_FILE_MANAGER.id;

            return {
              openApplicationIds:
                isLastApplicationWindow && !isFileManager
                  ? prevState.openApplicationIds.filter(
                      (id) => id !== application.id
                    )
                  : prevState.openApplicationIds,
              stackingOrder: prevState.stackingOrder.filter(
                (id) => id !== payload.id
              ),
              windows: prevState.windows.filter(({ id }) => id !== payload.id),
            };
          },
          undefined,
          {
            payload,
            type: "closeWindow",
          }
        ),
      collapseMenuitem: (payload) =>
        set(
          (prevState) => {
            const index = prevState.expandedMenuitemIds.indexOf(payload.id);

            if (index === -1) {
              return prevState;
            }

            return {
              expandedMenuitemIds: prevState.expandedMenuitemIds.slice(
                0,
                index
              ),
            };
          },
          undefined,
          {
            payload,
            type: "collapseMenuitem",
          }
        ),
      collapseWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    collapsed: true,
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "collapseWindow",
          }
        ),
      expandMenuitem: (payload) =>
        set(
          (prevState) => {
            const menuitem = document.getElementById(payload.id);

            if (!menuitem) {
              return prevState;
            }

            const siblingIds = Array.from(
              menuitem.parentElement?.children ?? []
            )
              .filter((element) => element !== menuitem)
              .map(({ id }) => id);

            for (const id of siblingIds) {
              const index = prevState.expandedMenuitemIds.indexOf(id);

              if (index !== -1) {
                return {
                  expandedMenuitemIds: [
                    ...prevState.expandedMenuitemIds.slice(0, index),
                    payload.id,
                  ],
                };
              }
            }

            const parentId = menuitem.parentElement?.closest(".menuitem")?.id;

            if (
              !parentId ||
              !prevState.expandedMenuitemIds.includes(parentId)
            ) {
              return { expandedMenuitemIds: [payload.id] };
            }

            return {
              expandedMenuitemIds: [
                ...prevState.expandedMenuitemIds,
                payload.id,
              ],
            };
          },
          undefined,
          {
            payload,
            type: "expandMenuitem",
          }
        ),
      expandWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    collapsed: false,
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "expandWindow",
          }
        ),
      focusSystemBar: () =>
        set(
          (prevState) => ({
            stackingOrder: [
              ...prevState.stackingOrder.filter((id) => id !== SYSTEM_BAR_ID),
              SYSTEM_BAR_ID,
            ],
            windows: prevState.windows.map((window) => ({
              ...window,
              focused: false,
            })),
          }),
          undefined,
          {
            payload: undefined,
            type: "focusSystemBar",
          }
        ),
      focusWindow: (payload) =>
        set(
          (prevState) => ({
            stackingOrder: [
              ...prevState.stackingOrder.filter((id) => id !== payload.id),
              payload.id,
            ],
            windows: prevState.windows.map((window) => ({
              ...window,
              focused: window.id === payload.id,
              hidden: window.hidden && window.id !== payload.id,
            })),
          }),
          undefined,
          {
            payload,
            type: "focusWindow",
          }
        ),
      hideWindow: (payload) =>
        set(
          (prevState) => ({
            stackingOrder: [
              payload.id,
              ...prevState.stackingOrder.filter((id) => id !== payload.id),
            ],
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    focused: false,
                    hidden: true,
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "hideWindow",
          }
        ),
      maximizeWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) => {
              if (window.id !== payload.id) {
                return window;
              }

              const windowElement = document.getElementById(window.id)!;
              const { marginBottom, marginLeft, marginRight, marginTop } =
                getComputedStyle(windowElement);
              const marginX = parseFloat(marginLeft) + parseFloat(marginRight);
              const marginY = parseFloat(marginBottom) + parseFloat(marginTop);
              const maxHeight = document.body.offsetHeight - marginY;
              const maxWidth = document.body.offsetWidth - marginX;
              const isMaximized =
                window.height !== "auto" &&
                window.width !== "auto" &&
                window.height >= maxHeight - WINDOW_DIMENSION_BUFFER &&
                window.height <= maxHeight + WINDOW_DIMENSION_BUFFER &&
                window.width >= maxWidth - WINDOW_DIMENSION_BUFFER &&
                window.width <= maxWidth + WINDOW_DIMENSION_BUFFER;

              if (isMaximized) {
                return {
                  ...window,
                  ...window.prev,
                  prev: undefined,
                };
              }

              return {
                ...window,
                height: maxHeight,
                prev: {
                  height: window.height,
                  width: window.width,
                  x: window.x,
                  y: window.y,
                },
                width: maxWidth,
                x: 0,
                y: 0,
              };
            }),
          }),
          undefined,
          {
            payload,
            type: "maximizeWindow",
          }
        ),
      moveTitlebar: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    titlebar: {
                      left: payload.left,
                    },
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "moveTitlebar",
          }
        ),
      moveWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    x: payload.x,
                    y: payload.y,
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "moveWindow",
          }
        ),
      openApplication: (payload) =>
        set(
          (prevState) => {
            const application = Object.values(applications).find(
              ({ id }) => id === payload.id
            );

            if (!application) {
              return prevState;
            }

            const isApplicationOpen = prevState.openApplicationIds.includes(
              payload.id
            );

            // if the application is already open, raise and focus its first visible window
            if (isApplicationOpen) {
              const firstVisibleWindow = prevState.windows.find(
                ({ applicationId, hidden }) =>
                  applicationId === application.id && !hidden
              );

              if (firstVisibleWindow) {
                return {
                  stackingOrder: [
                    ...prevState.stackingOrder.filter(
                      (id) => id !== firstVisibleWindow.id
                    ),
                    firstVisibleWindow.id,
                  ],
                  windows: prevState.windows.map((window) => ({
                    ...window,
                    focused: window.id === firstVisibleWindow.id,
                  })),
                };
              }

              return prevState;
            }

            const windowId = `window-${uuid()}`;
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const window: Window = {
              ...DEFAULT_WINDOW,
              title: DEFAULT_WINDOW.title,
              ...(application.getWindow?.() ?? {}),
              applicationId: application.id,
              id: windowId,
              x: windowPosition,
              y: windowPosition,
            };

            // open application and its initial window
            return {
              openApplicationIds: isApplicationOpen
                ? prevState.openApplicationIds
                : [...prevState.openApplicationIds, payload.id],
              stackingOrder: [...prevState.stackingOrder, window.id],
              windows: [
                ...prevState.windows.map((window) => ({
                  ...window,
                  focused: false,
                })),
                window,
              ],
            };
          },
          undefined,
          {
            payload,
            type: "openApplication",
          }
        ),
      openDialog: (payload) =>
        set(
          (prevState) => ({
            dialogs: [
              ...prevState.dialogs,
              {
                applicationId: payload.id,
                id: `dialog-${uuid()}`,
                type: payload.type,
              },
            ],
          }),
          undefined,
          {
            payload,
            type: "openDialog",
          }
        ),
      openFile: (payload) =>
        set(
          (prevState) => {
            const file = Object.values(files).find(
              ({ id }) => id === payload.id
            );

            if (!file) {
              return prevState;
            }

            const fileWindow = prevState.windows.find(
              (window) => "fileId" in window && window.fileId === file.id
            );

            // if the file is already open, unhide and/or focus its window
            if (fileWindow) {
              return {
                stackingOrder: [
                  ...prevState.stackingOrder.filter(
                    (id) => id !== fileWindow.id
                  ),
                  fileWindow.id,
                ],
                windows: prevState.windows.map((window) => ({
                  ...window,
                  focused: window.id === fileWindow.id,
                  hidden: window.hidden && window.id !== fileWindow.id,
                })),
              };
            }

            const application = Object.values(applications).find(
              ({ mimetypes }) => mimetypes.includes(file.mimetype)
            );

            if (!application) {
              return prevState;
            }

            const existingWindow = payload.windowId
              ? prevState.windows.find(({ id }) => id === payload.windowId)
              : undefined;

            // if opening file in an existing window
            if (existingWindow) {
              return {
                stackingOrder: [
                  ...prevState.stackingOrder.filter(
                    (id) => id !== existingWindow.id
                  ),
                  existingWindow.id,
                ],
                windows: prevState.windows.map((window) =>
                  window.id === existingWindow.id
                    ? {
                        ...window,
                        title: file.title,
                        ...(application.getWindow?.(file.id) ?? {}),
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

            const isApplicationOpen = prevState.openApplicationIds.includes(
              application.id
            );
            const windowId = `window-${uuid()}`;
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const window: Window = {
              ...DEFAULT_WINDOW,
              title: file.title,
              ...(application.getWindow?.(file.id) ?? {}),
              applicationId: application.id,
              fileId: file.id,
              id: windowId,
              x: windowPosition,
              y: windowPosition,
            };

            // open application and file window
            return {
              openApplicationIds: isApplicationOpen
                ? prevState.openApplicationIds
                : [...prevState.openApplicationIds, application.id],
              stackingOrder: [...prevState.stackingOrder, window.id],
              windows: [
                ...prevState.windows.map((window) => ({
                  ...window,
                  focused: false,
                })),
                window,
              ],
            };
          },
          undefined,
          {
            payload,
            type: "openFile",
          }
        ),
      openWindow: (payload) =>
        set(
          (prevState) => {
            const application = Object.values(applications).find(
              ({ id }) => id === payload.id
            );

            if (!application) {
              return prevState;
            }

            const isApplicationOpen = prevState.openApplicationIds.includes(
              payload.id
            );
            const windowId = `window-${uuid()}`;
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const window: Window = {
              ...DEFAULT_WINDOW,
              title: DEFAULT_WINDOW.title,
              ...(application.getWindow?.() ?? {}),
              applicationId: application.id,
              id: windowId,
              x: windowPosition,
              y: windowPosition,
            };

            return {
              openApplicationIds: isApplicationOpen
                ? prevState.openApplicationIds
                : [...prevState.openApplicationIds, payload.id],
              stackingOrder: [...prevState.stackingOrder, window.id],
              windows: [
                ...prevState.windows.map((window) => ({
                  ...window,
                  focused: false,
                })),
                window,
              ],
            };
          },
          undefined,
          {
            payload,
            type: "openWindow",
          }
        ),
      resizeWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    height: payload.height,
                    width: payload.width,
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "resizeWindow",
          }
        ),
      showWindow: (payload) =>
        set(
          (prevState) => ({
            stackingOrder: [
              ...prevState.stackingOrder.filter((id) => id !== payload.id),
              payload.id,
            ],
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    focused: true,
                    hidden: false,
                  }
                : {
                    ...window,
                    focused: false,
                  }
            ),
          }),
          undefined,
          {
            payload,
            type: "showWindow",
          }
        ),
      zoomWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) => {
              if (window.id !== payload.id) {
                return window;
              }

              const isZoomed =
                window.height === "auto" && window.width === "auto";

              if (isZoomed) {
                return {
                  ...window,
                  collapsed: false,
                  height: window.prev?.height ?? window.height,
                  prev: undefined,
                  width: window.prev?.width ?? window.width,
                };
              }

              return {
                ...window,
                collapsed: false,
                height: "auto",
                prev: {
                  height: window.height,
                  width: window.width,
                  x: window.x,
                  y: window.y,
                },
                width: "auto",
              };
            }),
          }),
          undefined,
          {
            payload,
            type: "zoomWindow",
          }
        ),
    }),
    { enabled: process.env.NODE_ENV === "development" }
  )
);
