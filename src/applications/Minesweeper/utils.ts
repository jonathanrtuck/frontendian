import { Square } from "./types";

type Coordinates = [rowIndex: number, columnIndex: number];

export const getAdjacentSquareCoordinates = (
  numRows: number,
  numColumns: number,
  coordinates: Coordinates
): Coordinates[] =>
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
        rowIndex !== numRows &&
        columnIndex !== -1 &&
        columnIndex !== numColumns
    );

export const getInitialSquares = (
  numRows: number,
  numColumns: number
): Square[][] =>
  new Array(numRows).fill(
    new Array(numColumns).fill({
      hasFlag: false,
      hasMine: false,
      isRevealed: false,
      numAdjacentMines: undefined,
    })
  );

export const isEqualCoordinates =
  ([rowA, columnA]: Coordinates) =>
  ([rowB, columnB]: Coordinates) =>
    rowA === rowB && columnA === columnB;

export const getMineCoordinates = (
  numRows: number,
  numColumns: number,
  numMines: number,
  avoidCoordinates: Coordinates
): Coordinates[] => {
  const arr: Coordinates[] = [];

  while (arr.length < numMines) {
    const coordinates: Coordinates = [
      Math.floor(Math.random() * numRows),
      Math.floor(Math.random() * numColumns),
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

// @recursive
export const revealSquare = (
  numRows: number,
  numColumns: number,
  squares: Square[][],
  coordinates: Coordinates
): Square[][] => {
  const [rowIndex, columnIndex] = coordinates;
  const square = squares[rowIndex][columnIndex];
  const { hasMine, isRevealed, numAdjacentMines } = square;

  if (isRevealed) {
    return squares;
  }

  const isEqualCoordinatesTo = isEqualCoordinates(coordinates);
  const nextSquares = squares.map((row, rowIndex) =>
    row.map((square, columnIndex) => ({
      ...square,
      isRevealed:
        isEqualCoordinatesTo([rowIndex, columnIndex]) || square.isRevealed,
    }))
  );

  if (!hasMine && numAdjacentMines === 0) {
    return getAdjacentSquareCoordinates(
      numRows,
      numColumns,
      coordinates
    ).reduce(
      (acc, coordinates) => revealSquare(numRows, numColumns, acc, coordinates),
      nextSquares
    );
  }

  return nextSquares;
};
