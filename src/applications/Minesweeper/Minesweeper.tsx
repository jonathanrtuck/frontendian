import clsx from "clsx";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";

import { Menubaritem, Menuitem, useMenubar } from "components/Menubar";
import { Minesweeper as Icon } from "icons";
import {
  Application,
  ApplicationComponentProps,
  ApplicationComponentRef,
} from "state/types";

import styles from "./Minesweeper.module.css";

type Coordinates = [rowIndex: number, columnIndex: number];

enum Level {
  Beginner = "beginner",
  Expert = "expert",
  Intermediate = "intermediate",
}

interface Square {
  hasFlag: boolean;
  hasMine: boolean;
  isRevealed: boolean;
  numAdjacentMines: number | undefined;
}

const getAdjacentSquareCoordinates = (
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

const getInitialSquares = (numRows: number, numColumns: number): Square[][] =>
  new Array(numRows).fill(
    new Array(numColumns).fill({
      hasFlag: false,
      hasMine: false,
      isRevealed: false,
      numAdjacentMines: undefined,
    })
  );

const isEqualCoordinates =
  ([rowA, columnA]: Coordinates) =>
  ([rowB, columnB]: Coordinates) =>
    rowA === rowB && columnA === columnB;

const getMineCoordinates = (
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
const revealSquare = (
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

const DEFAULT_LEVEL = Level.Beginner;

const DEFAULT_STATE: Record<
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
  [Level.Beginner]: {
    flagsRemaining: 10,
    height: 24 * 9 + 95,
    numColumns: 9,
    numMines: 10,
    numRows: 9,
    squares: getInitialSquares(9, 9),
    width: 24 * 9 + 28,
  },
  [Level.Intermediate]: {
    flagsRemaining: 40,
    height: 24 * 16 + 95,
    numColumns: 16,
    numMines: 40,
    numRows: 16,
    squares: getInitialSquares(16, 16),
    width: 24 * 16 + 28,
  },
  [Level.Expert]: {
    flagsRemaining: 99,
    height: 24 * 16 + 95,
    numColumns: 30,
    numMines: 99,
    numRows: 16,
    squares: getInitialSquares(16, 30),
    width: 24 * 30 + 28,
  },
};

const LEVELS: [lvl: Level, title: string][] = [
  [Level.Beginner, "Beginner"],
  [Level.Intermediate, "Intermediate"],
  [Level.Expert, "Expert"],
];

// @see https://github.com/jonathanrtuck/minesweeper
const Minesweeper = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ onQuit, onResize }, ref) => {
  const intervalRef = useRef<number>(0);

  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [flagsRemaining, setFlagsRemaining] = useState<number>(10);
  const [level, setLevel] = useState<Level>(DEFAULT_LEVEL);
  const [squares, setSquares] = useState<Square[][]>(
    DEFAULT_STATE[DEFAULT_LEVEL].squares
  );

  const isLost = useMemo<boolean>(
    () =>
      squares.flat().some(({ hasMine, isRevealed }) => hasMine && isRevealed),
    [squares]
  );
  const isWon = useMemo<boolean>(
    () =>
      squares.flat().every(({ hasMine, isRevealed }) => isRevealed !== hasMine),
    [squares]
  );
  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: onQuit,
            title: "Quit",
          },
        ],
        title: "File",
      },
      {
        items: [
          {
            onClick: () => {
              setElapsedTime(0);
              setFlagsRemaining(DEFAULT_STATE[level].flagsRemaining);
              setSquares(DEFAULT_STATE[level].squares);

              // reset window dimensions
              onResize(DEFAULT_STATE[level].height, DEFAULT_STATE[level].width);
            },
            title: "New",
          },
          null,
          ...LEVELS.map(
            ([lvl, title]: [Level, string]): Menuitem => ({
              checked: level === lvl,
              onClick: () => {
                if (level !== lvl) {
                  const { flagsRemaining, height, squares, width } =
                    DEFAULT_STATE[lvl];

                  setElapsedTime(0);
                  setFlagsRemaining(flagsRemaining);
                  setLevel(lvl);
                  setSquares(squares);

                  // update window dimensions
                  onResize(height, width);
                }
              },
              title,
              type: "radio",
            })
          ),
        ],
        title: "Game",
      },
    ],
    [level, onQuit, onResize]
  );

  useMenubar(menubaritems);

  useEffect(() => {
    if (elapsedTime === 1) {
      intervalRef.current = window.setInterval(() => {
        setElapsedTime((prevState) => prevState + 1);
      }, 1000);
    }

    if (elapsedTime === 0 || elapsedTime === 999) {
      window.clearInterval(intervalRef.current);
    }

    return () => {
      window.clearInterval(intervalRef.current);
    };
  }, [elapsedTime]);

  useEffect(() => {
    if (isLost || isWon) {
      window.clearInterval(intervalRef.current);
    }
  }, [isLost, isWon]);

  return (
    <div
      className={styles.root}
      onContextMenu={(e) => {
        e.preventDefault();
      }}>
      <header className={styles.header}>
        <data className={styles.ticker} value={flagsRemaining}>
          {flagsRemaining.toString().padStart(3, "0")}
        </data>
        <button
          aria-label="Reset"
          className={clsx(styles.reset, {
            [styles.lost]: isLost,
            [styles.won]: isWon,
          })}
          onClick={() => {
            setElapsedTime(0);
            setFlagsRemaining(DEFAULT_STATE[level].flagsRemaining);
            setSquares(DEFAULT_STATE[level].squares);
          }}
          type="reset"
        />
        <time className={styles.ticker} dateTime={`PT${elapsedTime}S`}>
          {elapsedTime.toString().padStart(3, "0")}
        </time>
      </header>
      <div className={styles.grid}>
        {squares.map((row, rowIndex) => (
          <div className={styles.row} key={rowIndex}>
            {row.map((_, columnIndex) => {
              const { hasFlag, hasMine, isRevealed, numAdjacentMines } =
                squares[rowIndex][columnIndex];
              const coordinates: Coordinates = [rowIndex, columnIndex];
              const isFlagged = squares[rowIndex][columnIndex].hasFlag;
              const isGameOver = isLost || isWon;
              const isRevealedMine = isLost && hasMine && !hasFlag;

              return (
                <button
                  aria-disabled={isRevealed || isGameOver}
                  className={clsx(styles.square, {
                    [styles[`number-${numAdjacentMines}`]]: isRevealed,
                    [styles.button]: !isRevealed && !isRevealedMine,
                    [styles.flag]: hasFlag,
                    [styles.gameOver]: isGameOver,
                    [styles.mine]: hasMine,
                    [styles.number]: isRevealed,
                    [styles.revealed]: isRevealed,
                  })}
                  key={columnIndex}
                  onClick={
                    isRevealed || isGameOver || hasFlag
                      ? undefined
                      : () => {
                          if (elapsedTime === 0) {
                            const mineCoordinates = getMineCoordinates(
                              DEFAULT_STATE[level].numRows,
                              DEFAULT_STATE[level].numColumns,
                              DEFAULT_STATE[level].numMines,
                              coordinates
                            );

                            // start timer
                            setElapsedTime(1);
                            // set mines
                            setSquares((prevState) => {
                              const squaresWithMines = prevState.map(
                                (row, rowIndex) =>
                                  row.map((square, columnIndex) => ({
                                    ...square,
                                    hasMine: mineCoordinates.some(
                                      isEqualCoordinates([
                                        rowIndex,
                                        columnIndex,
                                      ])
                                    ),
                                  }))
                              );
                              const nextSquares = squaresWithMines.map(
                                (row, rowIndex) =>
                                  row.map((square, columnIndex) => ({
                                    ...square,
                                    numAdjacentMines:
                                      getAdjacentSquareCoordinates(
                                        DEFAULT_STATE[level].numRows,
                                        DEFAULT_STATE[level].numColumns,
                                        [rowIndex, columnIndex]
                                      )
                                        .map(
                                          ([rowIndex, columnIndex]) =>
                                            squaresWithMines[rowIndex][
                                              columnIndex
                                            ]
                                        )
                                        .reduce(
                                          (acc, { hasMine }) =>
                                            acc + (hasMine ? 1 : 0),
                                          0
                                        ),
                                  }))
                              );

                              return revealSquare(
                                DEFAULT_STATE[level].numRows,
                                DEFAULT_STATE[level].numColumns,
                                nextSquares,
                                coordinates
                              );
                            });
                          } else {
                            setSquares((prevState) =>
                              revealSquare(
                                DEFAULT_STATE[level].numRows,
                                DEFAULT_STATE[level].numColumns,
                                prevState,
                                coordinates
                              )
                            );
                          }
                        }
                  }
                  onContextMenu={
                    isRevealed || isGameOver
                      ? undefined
                      : () => {
                          if (flagsRemaining !== 0) {
                            setFlagsRemaining(
                              (prevState) => prevState + (isFlagged ? 1 : -1)
                            );
                            setSquares((prevState) =>
                              prevState.map((row, i) =>
                                row.map((square, j) =>
                                  i === rowIndex && j === columnIndex
                                    ? {
                                        ...square,
                                        hasFlag: !isFlagged,
                                      }
                                    : square
                                )
                              )
                            );
                          }
                        }
                  }
                  tabIndex={0}
                  type="button">
                  {isRevealedMine && "💣"}
                  {hasFlag && (isLost && !hasMine ? "💣" : "🚩")}
                  {isWon && hasMine && "🚩"}
                  {isRevealed &&
                    !isRevealedMine &&
                    numAdjacentMines !== 0 &&
                    numAdjacentMines}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
});

export const APPLICATION_MINESWEEPER: Application = {
  Component: Minesweeper,
  getWindow: () => ({
    fixedSize: true,
    height: DEFAULT_STATE[DEFAULT_LEVEL].height,
    title: "Minesweeper",
    width: DEFAULT_STATE[DEFAULT_LEVEL].width,
  }),
  icon: <Icon />,
  id: "application-minesweeper",
  title: "Minesweeper",
  windowIds: [],
};
