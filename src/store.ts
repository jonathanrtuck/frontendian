import { create } from "zustand";

import { Actions, ID, State } from "types";

type Store = State & Actions;

const INITIAL_STATE: State = {
  windows: [
    {
      focused: true,
      height: 300,
      hidden: false,
      id: "window-id-1",
      left: 96,
      title: "Window…",
      titleBarLeft: 0,
      top: 96,
      width: 480,
      zoomed: false,
    },
  ],
};

export const useStore = create<Store>()((set) => ({
  ...INITIAL_STATE,
  blurWindows: (windowIds: ID[]) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              focus: false,
            }
          : window
      ),
    })),
  closeWindows: (windowIds: ID[]) =>
    set((state) => ({
      ...state,
      windows: state.windows.filter((window) => !windowIds.includes(window.id)),
    })),
  focusWindow: (windowIds: ID[]) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) => ({
        ...window,
        focused: windowIds.includes(window.id),
      })),
    })),
  hideWindows: (windowIds: ID[]) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              hidden: true,
            }
          : window
      ),
    })),
  moveWindows: (windowIds: ID[], left: number, top: number) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              left,
              top,
            }
          : window
      ),
    })),
  moveWindowTitleBar: (windowIds: ID[], titleBarLeft: number) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              titleBarLeft,
            }
          : window
      ),
    })),
  resizeWindows: (windowIds: ID[], height: number, width: number) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              height,
              width,
            }
          : window
      ),
    })),
  showWindows: (windowIds: ID[]) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              hidden: false,
            }
          : window
      ),
    })),
  zoomWindows: (windowIds: ID[]) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              zoomed: !window.zoomed,
            }
          : window
      ),
    })),
}));
