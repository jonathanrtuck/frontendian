export type Coordinates = [rowIndex: number, columnIndex: number];

export type Level = "beginner" | "expert" | "intermediate";

export interface Square {
  hasFlag: boolean;
  hasMine: boolean;
  isRevealed: boolean;
  numAdjacentMines: number | undefined;
}
