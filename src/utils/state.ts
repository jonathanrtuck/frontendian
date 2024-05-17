import {
  DEFAULT_WINDOW_POSITION_INCREMENT,
  DEFAULT_WINDOW_POSITION_OFFSET,
} from "consts";
import { Window } from "types";

export const getFirstOpenWindowPosition = (windows: Window[]): number => {
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
