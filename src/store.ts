import { v4 as uuid } from "uuid";
import { create } from "zustand";

import {
  DEFAULT_WINDOW_POSITION_INCREMENT,
  DEFAULT_WINDOW_POSITION_OFFSET,
  INITIAL_STATE,
} from "consts";
import { Actions, ID, State, Window } from "types";

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
              focused: false,
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
      stackingOrder: [
        ...state.stackingOrder.filter((id) => !isPayloadId(payload, id)),
        ...("id" in payload ? [payload.id] : payload.ids),
      ],
      windows: state.windows.map((window) => ({
        ...window,
        focused: isPayloadId(payload, window.id),
        hidden: isPayloadId(payload, window.id) ? false : window.hidden,
      })),
    })),
  hide: (payload) =>
    set((state) => ({
      ...state,
      stackingOrder: [
        ...("id" in payload ? [payload.id] : payload.ids),
        ...state.stackingOrder.filter((id) => !isPayloadId(payload, id)),
      ],
      windows: state.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              focused: false,
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
      stackingOrder: [
        ...state.stackingOrder.filter((id) => !isPayloadId(payload, id)),
        ...("id" in payload ? [payload.id] : payload.ids),
      ],
      windows: state.windows.map((window) =>
        isPayloadId(payload, window.id)
          ? {
              ...window,
              focused: true,
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
