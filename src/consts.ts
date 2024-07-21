import { ID, State } from "types";

export const DEFAULT_WINDOW_HEIGHT = 450;

export const DEFAULT_WINDOW_POSITION_INCREMENT = 32;

export const DEFAULT_WINDOW_POSITION_OFFSET = 96;

export const DEFAULT_WINDOW_WIDTH = 600;

export const DESKBAR_ID: ID = "deskbar";

export const INITIAL_STATE: State = {
  stackingOrder: [DESKBAR_ID, "window-id-0"],
  windows: [
    {
      focused: true,
      height: 300,
      hidden: false,
      id: "window-id-0",
      left: 96,
      title: "Window…",
      titleBarLeft: 0,
      top: 96,
      width: 480,
      zoomed: false,
    },
  ],
};
