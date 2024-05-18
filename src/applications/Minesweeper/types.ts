export type Action = FlagAction | ResetAction | RevealAction | TickAction;

export type Coordinates = [rowIndex: number, columnIndex: number];

export interface FlagAction {
  coordinates: Coordinates;
  type: "flag";
}

export interface ResetAction {
  type: "reset";
}

export interface RevealAction {
  coordinates: Coordinates;
  type: "reveal";
}

export interface SquareState {
  hasFlag: boolean;
  hasMine: boolean;
  isRevealed: boolean;
  numAdjacentMines: number | undefined;
}

export interface State {
  elapsedTime: number;
  flagsRemaining: number;
  isLost: boolean;
  isWon: boolean;
  numColumns: number;
  numMines: number;
  numRows: number;
  squares: SquareState[][];
}

export interface TickAction {
  type: "tick";
}
