import { INITIAL_SQUARE_STATE } from "./constants";
import { Coordinates, State } from "./types";

export const getAdjacentSquareCoordinates =
  (state: State) =>
  (coordinates: Coordinates): Coordinates[] =>
    [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ]
      // adjecent squares' coordinates
      .map(
        ([rowOffset, columnOffset]): Coordinates => [
          coordinates[0] + rowOffset,
          coordinates[1] + columnOffset,
        ]
      )
      // remove coordinates outside of the board
      .filter(
        ([rowIndex, columnIndex]) =>
          rowIndex !== -1 &&
          rowIndex !== state.numRows &&
          columnIndex !== -1 &&
          columnIndex !== state.numColumns
      );

export const getInitialSquares = (numRows: number, numColumns: number) =>
  new Array(numRows).fill(new Array(numColumns).fill(INITIAL_SQUARE_STATE));

export const getIsLost = (state: State): boolean =>
  state.squares.flat().some(({ hasMine, isRevealed }) => hasMine && isRevealed);

export const getIsWon = (state: State): boolean =>
  state.squares
    .flat()
    .every(({ hasMine, isRevealed }) => isRevealed !== hasMine);

export const getMineCoordinates = (
  state: State,
  avoidCoordinates: Coordinates
): Coordinates[] => {
  const arr: Coordinates[] = [];

  while (arr.length < state.numMines) {
    const coordinates: Coordinates = [
      Math.floor(Math.random() * state.numRows),
      Math.floor(Math.random() * state.numColumns),
    ];
    const isEqualWith = isEqualCoordinates(coordinates);

    // square to avoid or already has mine
    if (isEqualWith(avoidCoordinates) || arr.some(isEqualWith)) {
      continue;
    }

    arr.push(coordinates);
  }

  return arr;
};

export const isEqualCoordinates = (a: Coordinates) => (b: Coordinates) =>
  a[0] === b[0] && a[1] === b[1];
