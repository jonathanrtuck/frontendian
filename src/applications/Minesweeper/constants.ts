import { SquareState, State } from "./types";
import { getInitialSquares } from "./utils";

export const INITIAL_SQUARE_STATE: SquareState = {
  hasFlag: false,
  hasMine: false,
  isRevealed: false,
  numAdjacentMines: undefined,
};

export const BEGINNER_STATE: State = {
  elapsedTime: 0,
  flagsRemaining: 10,
  isLost: false,
  isWon: false,
  numColumns: 9,
  numMines: 10,
  numRows: 9,
  squares: getInitialSquares(9, 9),
};
export const INTERMEDIATE_STATE: State = {
  elapsedTime: 0,
  flagsRemaining: 40,
  isLost: false,
  isWon: false,
  numColumns: 16,
  numMines: 40,
  numRows: 16,
  squares: getInitialSquares(16, 16),
};
export const EXPERT_STATE: State = {
  elapsedTime: 0,
  flagsRemaining: 99,
  isLost: false,
  isWon: false,
  numColumns: 30,
  numMines: 99,
  numRows: 16,
  squares: getInitialSquares(16, 30),
};
