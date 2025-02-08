import * as applicationConfigurations from "@/applications";
import * as files from "@/files";
import * as fonts from "@/fonts";
import { Pdf, Text } from "@/icons";
import * as themes from "@/themes";
import type { Actions, ID, Pixels, State, Theme, Window } from "@/types";
import { v4 as uuid } from "uuid";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const DEFAULT_THEME = Object.values(themes).find(({ isDefault }) => isDefault)!;
const DEFAULT_WINDOW_POSITION_INCREMENT = 32;
const DEFAULT_WINDOW_POSITION_OFFSET = 96;
const DEFAULT_WINDOW: Window = {
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
const SYSTEM_BAR_ID: ID = "system-bar";
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
      applications: Object.values(applicationConfigurations).map(
        (applicationConfiguration) => ({
          ...applicationConfiguration,
          windowIds: [],
        })
      ),
      currentThemeId: DEFAULT_THEME.id,
      desktop: [files.FILE_RESUME_PDF.id],
      files: Object.values(files),
      fonts: Object.values(fonts),
      openApplicationIds: [
        applicationConfigurations.APPLICATION_FILE_MANAGER.id,
      ],
      stackingOrder: [SYSTEM_BAR_ID],
      systemBarId: SYSTEM_BAR_ID,
      themes: Object.values(themes),
      types: {
        "application/pdf": {
          // application: applicationConfigurations.APPLICATION_PDF_VIEWER.id,
          Icon: Pdf,
        },
        "text/markdown": {
          application: applicationConfigurations.APPLICATION_TEXT_EDITOR.id,
          Icon: Text,
        },
      },
      windows: [],
      // eslint-disable-next-line sort-keys
      blurWindow: (payload) =>
        set(
          (prevState) => ({
            ...prevState,
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
            const application = prevState.applications.find(
              ({ id }) => id === payload.id
            );

            if (!application) {
              return prevState;
            }

            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application.id === payload.id
                  ? {
                      ...application,
                      windowIds: [],
                    }
                  : application
              ),
              openApplicationIds: prevState.openApplicationIds.filter(
                (id) =>
                  id ===
                    applicationConfigurations.APPLICATION_FILE_MANAGER.id ||
                  id !== payload.id
              ),
              stackingOrder: prevState.stackingOrder.filter(
                (id) => !application.windowIds.includes(id)
              ),
              windows: prevState.windows.filter(
                ({ id }) => !application.windowIds.includes(id)
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
            const windowApplication = prevState.applications.find(
              ({ windowIds }) => windowIds.includes(payload.id)
            );
            const isLastApplicationWindow =
              windowApplication?.windowIds.length === 1;
            const isFileManager =
              windowApplication?.id ===
              applicationConfigurations.APPLICATION_FILE_MANAGER.id;

            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application === windowApplication
                  ? {
                      ...application,
                      windowIds: application.windowIds.filter(
                        (id) => id !== payload.id
                      ),
                    }
                  : application
              ),
              openApplicationIds:
                isLastApplicationWindow && !isFileManager
                  ? prevState.openApplicationIds.filter(
                      (id) => id !== windowApplication?.id
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
            ...prevState,
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
            ...prevState,
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
            ...prevState,
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
            ...prevState,
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
            ...prevState,
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
            ...prevState,
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
            ...prevState,
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
            const application = prevState.applications.find(
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
              const firstVisibleWindow = application.windowIds
                .map((id) =>
                  prevState.windows.find((window) => window.id === id)
                )
                .find((window) => window && !window.hidden);

              if (firstVisibleWindow) {
                return {
                  ...prevState,
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
              ...(application.getWindow?.() ?? {}),
              id: windowId,
              left: windowPosition,
              top: windowPosition,
            };

            // open application and its initial window
            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application.id === payload.id
                  ? {
                      ...application,
                      windowIds: [...application.windowIds, windowId],
                    }
                  : application
              ),
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
            const file = prevState.files.find(({ id }) => id === payload.id);

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
                  ...prevState,
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
                ...prevState,
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

            const applicationId = prevState.types[file.type]?.application;

            if (!applicationId) {
              return prevState;
            }

            const application = prevState.applications.find(
              ({ id }) => id === applicationId
            );
            const theme = prevState.themes.find(
              ({ id }) => id === prevState.currentThemeId
            )!;
            const existingWindow = payload.windowId
              ? prevState.windows.find(({ id }) => id === payload.windowId)
              : undefined;

            // if opening file in an existing window
            if (existingWindow) {
              return {
                ...prevState,
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
                        title: file.getTitle(theme),
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
              prevState.openApplicationIds.includes(applicationId);
            const windowId = uuid();
            const windowPosition = getFirstOpenWindowPosition(
              prevState.windows
            );
            const window: Window = {
              ...DEFAULT_WINDOW,
              title: file.getTitle(theme),
              ...(application?.getWindow?.(file) ?? {}),
              fileId: file.id,
              id: windowId,
              left: windowPosition,
              top: windowPosition,
            };

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
            const application = prevState.applications.find(
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
              ...(application.getWindow?.() ?? {}),
              id: windowId,
              left: windowPosition,
              top: windowPosition,
            };

            return {
              ...prevState,
              applications: prevState.applications.map((application) =>
                application.id === payload.id
                  ? {
                      ...application,
                      windowIds: [...application.windowIds, windowId],
                    }
                  : application
              ),
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
            ...prevState,
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
      setTheme: (payload) =>
        set(
          (prevState) => ({
            ...prevState,
            currentThemeId: payload.id,
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
            ...prevState,
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
            ...prevState,
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
              const frameHeight =
                offsetHeight + marginY - (window.collapsed ? 0 : window.height);
              const frameWidth = offsetWidth + marginX - window.width;
              const maxHeight = document.body.offsetHeight - frameHeight;
              const maxWidth = document.body.offsetWidth - frameWidth;
              const isZoomed =
                window.height >= maxHeight - WINDOW_DIMENSION_BUFFER &&
                window.height <= maxHeight + WINDOW_DIMENSION_BUFFER &&
                window.width >= maxWidth - WINDOW_DIMENSION_BUFFER &&
                window.width <= maxWidth + WINDOW_DIMENSION_BUFFER;

              // 503 53 450 - normal
              //  29 29 450 - collapsed
              console.debug(offsetHeight, frameHeight, window.height);

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
                    height: maxHeight,
                    left: 0,
                    prev: {
                      height: window.height,
                      left: window.left,
                      top: window.top,
                      width: window.width,
                    },
                    top: 0,
                    width: maxWidth,
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
