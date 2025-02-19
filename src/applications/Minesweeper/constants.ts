import type { Level, Square } from "./types";
import { getInitialSquares } from "./utils";

const WINDOW_CHROME_HEIGHT = 16 * 2.25; // 2.25rem
const WINDOW_CHROME_WIDTH = 16 * 0.75; // 0.75rem

export const APPLICATION_ID = "application-minesweeper";
export const BORDER_SIZE = 16 * 0.1875; // 0.1875rem
export const HEADER_HEIGHT = 16 * 3.75; // 3.75rem
export const PADDING_SIZE = 16 * 0.5; // 0.5rem
export const SQUARE_SIZE = 16 * 1.5; // 1.5rem
export const DEFAULT_LEVEL: Level = "beginner";
export const DEFAULT_STATE: Record<
  Level,
  {
    flagsRemaining: number;
    height: number;
    numColumns: number;
    numMines: number;
    numRows: number;
    squares: Square[][];
    width: number;
  }
> = {
  beginner: {
    flagsRemaining: 10,
    height:
      WINDOW_CHROME_HEIGHT +
      SQUARE_SIZE * 9 +
      (BORDER_SIZE * 4 + PADDING_SIZE * 3 + HEADER_HEIGHT),
    numColumns: 9,
    numMines: 10,
    numRows: 9,
    squares: getInitialSquares(9, 9),
    width:
      WINDOW_CHROME_WIDTH +
      SQUARE_SIZE * 9 +
      (BORDER_SIZE * 4 + PADDING_SIZE * 2),
  },
  expert: {
    flagsRemaining: 99,
    height:
      WINDOW_CHROME_HEIGHT +
      SQUARE_SIZE * 16 +
      (BORDER_SIZE * 4 + PADDING_SIZE * 3 + HEADER_HEIGHT),
    numColumns: 30,
    numMines: 99,
    numRows: 16,
    squares: getInitialSquares(16, 30),
    width:
      WINDOW_CHROME_WIDTH +
      SQUARE_SIZE * 30 +
      (BORDER_SIZE * 4 + PADDING_SIZE * 2),
  },
  intermediate: {
    flagsRemaining: 40,
    height:
      WINDOW_CHROME_HEIGHT +
      SQUARE_SIZE * 16 +
      (BORDER_SIZE * 4 + PADDING_SIZE * 3 + HEADER_HEIGHT),
    numColumns: 16,
    numMines: 40,
    numRows: 16,
    squares: getInitialSquares(16, 16),
    width:
      WINDOW_CHROME_WIDTH +
      SQUARE_SIZE * 16 +
      (BORDER_SIZE * 4 + PADDING_SIZE * 2),
  },
};
export const LEVELS: [key: Level, value: string][] = [
  ["beginner", "Beginner"],
  ["intermediate", "Intermediate"],
  ["expert", "Expert"],
];
