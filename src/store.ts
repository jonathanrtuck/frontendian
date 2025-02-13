import * as applications from "@/applications";
import * as files from "@/files";
import { SYSTEM_BAR_ID } from "@/ids";
import { MIMETYPES } from "@/mimetypes";
import * as themes from "@/themes";
import type { Actions, Pixels, State, Window } from "@/types";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DEFAULT_THEME = Object.values(themes).find(({ isDefault }) => isDefault)!;
const DEFAULT_WINDOW_POSITION_INCREMENT = 32;
const DEFAULT_WINDOW_POSITION_OFFSET = 96;
const DEFAULT_WINDOW: Window = {
  applicationId: "",
  collapsed: false,
  focused: true,
  height: 450,
  hidden: false,
  id: "",
  left: DEFAULT_WINDOW_POSITION_OFFSET,
  resizable: true,
  scrollable: true,
  title: "Untitled",
  titlebarLeft: 0,
  top: DEFAULT_WINDOW_POSITION_OFFSET,
  width: 600,
  zoomed: false,
};
const WINDOW_DIMENSION_BUFFER = 12;

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

export const useStore = create(
  devtools<State & Actions>(
    (set) => ({
      desktop: [files.FILE_RESUME_PDF.id],
      openApplicationIds: [applications.APPLICATION_FILE_MANAGER.id],
      stackingOrder: [SYSTEM_BAR_ID],
      themeId: DEFAULT_THEME.id,
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
              return prevState;
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
      moveWindow: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    left: payload.left,
                    top: payload.top,
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
      moveWindowTitlebar: (payload) =>
        set(
          (prevState) => ({
            windows: prevState.windows.map((window) =>
              window.id === payload.id
                ? {
                    ...window,
                    titlebarLeft: payload.left,
                  }
                : window
            ),
          }),
          undefined,
          {
            payload,
            type: "moveWindowTitlebar",
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

            const windowId = uuid();
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const window: Window = {
              ...DEFAULT_WINDOW,
              title: DEFAULT_WINDOW.title,
              ...(application.getWindow?.({
                themeId: prevState.themeId,
              }) ?? {}),
              applicationId: application.id,
              id: windowId,
              left: windowPosition,
              top: windowPosition,
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
              ({ fileId }) => fileId === file.id
            );

            // if the file is already open, unhide and/or focus its window
            if (fileWindow) {
              if (fileWindow.hidden) {
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
                })),
              };
            }

            const applicationId = MIMETYPES[file.mimetype]?.applicationId;

            if (!applicationId) {
              return prevState;
            }

            const application = Object.values(applications).find(
              ({ id }) => id === applicationId
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
                        title: file.getTitle({
                          themeId: prevState.themeId,
                        }),
                        ...(application.getWindow?.({
                          file,
                          themeId: prevState.themeId,
                        }) ?? {}),
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
              prevState.openApplicationIds.includes(applicationId);
            const windowId = uuid();
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const window: Window = {
              ...DEFAULT_WINDOW,
              title: file.getTitle({
                themeId: prevState.themeId,
              }),
              ...(application.getWindow?.({
                file,
                themeId: prevState.themeId,
              }) ?? {}),
              applicationId,
              fileId: file.id,
              id: windowId,
              left: windowPosition,
              top: windowPosition,
            };

            // open application and file window
            return {
              openApplicationIds: isApplicationOpen
                ? prevState.openApplicationIds
                : [...prevState.openApplicationIds, applicationId],
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
            const windowId = uuid();
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const window: Window = {
              ...DEFAULT_WINDOW,
              title: DEFAULT_WINDOW.title,
              ...(application.getWindow?.({
                themeId: prevState.themeId,
              }) ?? {}),
              applicationId: application.id,
              id: windowId,
              left: windowPosition,
              top: windowPosition,
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
                    zoomed: false,
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
      setTheme: (payload) =>
        set(
          () => ({
            themeId: payload.id,
          }),
          undefined,
          {
            payload,
            type: "setTheme",
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
                : window
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

              const windowElement = document.getElementById(window.id)!;
              const { offsetHeight, offsetWidth } = windowElement;
              const { marginBottom, marginLeft, marginRight, marginTop } =
                getComputedStyle(windowElement);
              const marginX = parseFloat(marginLeft) + parseFloat(marginRight);
              const marginY = parseFloat(marginBottom) + parseFloat(marginTop);
              const maxHeight = document.body.offsetHeight - marginY;
              const maxWidth = document.body.offsetWidth - marginX;
              const left = 0;
              const top =
                prevState.themeId === themes.THEME_MAC_OS_CLASSIC.id
                  ? document.getElementById(SYSTEM_BAR_ID)!.offsetHeight
                  : 0;
              const isZoomed =
                offsetHeight >= maxHeight - WINDOW_DIMENSION_BUFFER &&
                offsetHeight <= maxHeight + WINDOW_DIMENSION_BUFFER &&
                offsetWidth >= maxWidth - WINDOW_DIMENSION_BUFFER &&
                offsetWidth <= maxWidth + WINDOW_DIMENSION_BUFFER &&
                window.left >= left - WINDOW_DIMENSION_BUFFER &&
                window.left <= left + WINDOW_DIMENSION_BUFFER &&
                window.top >= top - WINDOW_DIMENSION_BUFFER &&
                window.top <= top + WINDOW_DIMENSION_BUFFER;

              return isZoomed
                ? {
                    ...window,
                    ...window.prev,
                    prev: window.zoomed ? window.prev : undefined,
                    zoomed: false,
                  }
                : {
                    ...window,
                    collapsed: false,
                    left,
                    prev: window.zoomed
                      ? window.prev
                      : {
                          height: window.height,
                          left: window.left,
                          top: window.top,
                          width: window.width,
                        },
                    top,
                    zoomed: true,
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
