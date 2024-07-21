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

const isPayloadId = (payload: { id: ID } | { ids: ID[] }, id: ID): boolean =>
  ("id" in payload && id === payload.id) ||
  ("ids" in payload && payload.ids.includes(id));

export const useStore = create<State & Actions>()((set) => ({
  ...INITIAL_STATE,
  blur: (payload) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              focus: false,
            }
          : window
      ),
    })),
  close: (payload) =>
    set((state) => ({
      ...state,
      windows: state.windows.filter(
        (window) => !isPayloadId(payload, window.id)
      ),
    })),
  focus: (payload) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) => ({
        ...window,
        focused: isPayloadId(payload, window.id),
      })),
    })),
  hide: (payload) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              hidden: true,
            }
          : window
      ),
    })),
  move: (payload) => {
    switch (payload.type) {
      case "titlebar":
        set((state) => ({
          ...state,
          windows: state.windows.map((window) =>
            isPayloadId(payload, window.id)
              ? {
                  ...window,
                  titleBarLeft: payload.left,
                }
              : window
          ),
        }));
        break;
      case "window":
        set((state) => ({
          ...state,
          windows: state.windows.map((window) =>
            isPayloadId(payload, window.id)
              ? {
                  ...window,
                  left: payload.left,
                  top: payload.top,
                }
              : window
          ),
        }));
        break;
    }
  },
  resize: (payload) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              height: payload.height,
              width: payload.width,
            }
          : window
      ),
    })),
  show: (payload) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              hidden: false,
            }
          : window
      ),
    })),
  zoom: (payload) =>
    set((state) => ({
      ...state,
      windows: state.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              zoomed: !window.zoomed,
            }
          : window
      ),
    })),
}));
