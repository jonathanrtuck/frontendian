import { v4 as uuid } from "uuid";
import { create } from "zustand";

import { Actions, ID, State } from "types";

const INITIAL_STATE: State = {
  windows: [
    {
      focused: true,
      height: 300,
      hidden: false,
      id: uuid(),
      left: 96,
      title: "Window…",
      titleBarLeft: 0,
      top: 96,
      width: 480,
      zoomed: false,
    },
  ],
};

export const useStore = create<State & Actions>()((set) => ({
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
  moveWindows: (windowIds: ID[], payload: { left: number; top: number }) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              ...payload,
            }
          : window
      ),
    })),
  moveWindowTitleBar: (windowIds: ID[], payload: { titleBarLeft: number }) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              ...payload,
            }
          : window
      ),
    })),
  resizeWindows: (
    windowIds: ID[],
    payload: { height: number; width: number }
  ) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        windowIds.includes(window.id)
          ? {
              ...window,
              ...payload,
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
