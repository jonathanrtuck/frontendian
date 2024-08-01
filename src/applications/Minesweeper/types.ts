export type Coordinates = [rowIndex: number, columnIndex: number];

export const enum Level {
  Beginner = "beginner",
  Expert = "expert",
  Intermediate = "intermediate",
}

export interface Square {
  hasFlag: boolean;
  hasMine: boolean;
  isRevealed: boolean;
  numAdjacentMines: number | undefined;
}
