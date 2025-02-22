"use client";

import "./Minesweeper.css";
import { AboutMinesweeper } from "./AboutMinesweeper";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import type { Application } from "@/types";
import clsx from "clsx";
import { useEffect, useRef, useState } from "react";

type Coordinates = [rowIndex: number, columnIndex: number];
type Level = "beginner" | "expert" | "intermediate";
type Square = {
  hasFlag: boolean;
  hasMine: boolean;
  isRevealed: boolean;
  numAdjacentMines: number | undefined;
};

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

const DEFAULT_LEVEL: Level = "beginner";
const DEFAULT_STATE: Record<
  Level,
  {
    flagsRemaining: number;
    numColumns: number;
    numMines: number;
    numRows: number;
    squares: Square[][];
  }
> = {
  beginner: {
    flagsRemaining: 10,
    numColumns: 9,
    numMines: 10,
    numRows: 9,
    squares: getInitialSquares(9, 9),
  },
  expert: {
    flagsRemaining: 99,
    numColumns: 30,
    numMines: 99,
    numRows: 16,
    squares: getInitialSquares(16, 30),
  },
  intermediate: {
    flagsRemaining: 40,
    numColumns: 16,
    numMines: 40,
    numRows: 16,
    squares: getInitialSquares(16, 16),
  },
};
const LEVELS: [key: Level, value: string][] = [
  ["beginner", "Beginner"],
  ["intermediate", "Intermediate"],
  ["expert", "Expert"],
];

// @see https://github.com/jonathanrtuck/minesweeper
export const Minesweeper: Application["Component"] = ({ windowId }) => {
  const closeApplication = useStore((store) => store.closeApplication);
  const openDialog = useStore((store) => store.openDialog);
  const openWindow = useStore((store) => store.openWindow);
  const theme = useTheme();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [flagsRemaining, setFlagsRemaining] = useState<number>(10);
  const [level, setLevel] = useState<Level>(DEFAULT_LEVEL);
  const [squares, setSquares] = useState<Square[][]>(
    DEFAULT_STATE[DEFAULT_LEVEL].squares
  );
  const isLost = squares
    .flat()
    .some(({ hasMine, isRevealed }) => hasMine && isRevealed);
  const isWon = squares
    .flat()
    .every(({ hasMine, isRevealed }) => isRevealed !== hasMine);

  useEffect(() => {
    if (elapsedTime === 1) {
      intervalRef.current = setInterval(
        () => setElapsedTime((prevState) => prevState + 1),
        1000
      );
    }

    if (intervalRef.current && (elapsedTime === 0 || elapsedTime === 999)) {
      clearInterval(intervalRef.current);
    }
  }, [elapsedTime]);
  useEffect(
    () =>
      intervalRef.current && (isLost || isWon)
        ? clearInterval(intervalRef.current)
        : undefined,
    [isLost, isWon]
  );
  useEffect(
    () => () =>
      intervalRef.current ? clearInterval(intervalRef.current) : undefined,
    []
  );

  return (
    <>
      <Menubar>
        <Menuitem title="File">
          <Menu>
            <Menuitem
              onClick={() =>
                closeApplication({ id: "application-minesweeper" })
              }
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="Game">
          <Menu>
            <Menuitem
              onClick={() => {
                setElapsedTime(0);
                setFlagsRemaining(DEFAULT_STATE[level].flagsRemaining);
                setSquares(DEFAULT_STATE[level].squares);
              }}
              title="New"
            />
            <Menuitem separator />
            {LEVELS.map(([lvl, title]) => (
              <Menuitem
                checked={level === lvl}
                key={lvl}
                onClick={() => {
                  const { flagsRemaining, squares } = DEFAULT_STATE[lvl];

                  setElapsedTime(0);
                  setFlagsRemaining(flagsRemaining);
                  setLevel(lvl);
                  setSquares(squares);
                }}
                title={title}
                type="radio"
              />
            ))}
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() =>
                theme === "mac-os-classic"
                  ? openWindow({
                      Component: AboutMinesweeper,
                      id: "application-minesweeper",
                      title: "About Minesweeper",
                    })
                  : openDialog({
                      Component: AboutMinesweeper,
                      title: "About Minesweeper",
                      windowId,
                    })
              }
              title="About Minesweeper…"
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content>
        <div className="minesweeper" onContextMenu={(e) => e.preventDefault()}>
          <header>
            <data value={flagsRemaining}>
              {flagsRemaining.toString().padStart(3, "0")}
            </data>
            <button
              aria-label="Reset"
              className={clsx({
                isLost,
                isWon,
              })}
              onClick={() => {
                setElapsedTime(0);
                setFlagsRemaining(DEFAULT_STATE[level].flagsRemaining);
                setSquares(DEFAULT_STATE[level].squares);
              }}
              type="reset"
            />
            <time dateTime={`PT${elapsedTime}S`}>
              {elapsedTime.toString().padStart(3, "0")}
            </time>
          </header>
          <div>
            {squares.map((row, rowIndex) => (
              // eslint-disable-next-line react/no-array-index-key
              <div key={rowIndex}>
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
                      className={clsx({
                        hasFlag,
                        hasMine,
                        isButton: !isRevealed && !isRevealedMine,
                        isGameOver,
                        isRevealed,
                      })}
                      data-number={isRevealed ? numAdjacentMines : undefined}
                      key={columnIndex} // eslint-disable-line react/no-array-index-key
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
                                  (prevState) =>
                                    prevState + (isFlagged ? 1 : -1)
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
                      type="button">
                      {Boolean(
                        isRevealedMine || (hasFlag && isLost && !hasMine)
                      ) && "💣"}
                      {Boolean(
                        (!isGameOver && hasFlag) ||
                          ((isWon || hasFlag) && hasMine)
                      ) && "🚩"}
                      {Boolean(
                        isRevealed && !isRevealedMine && numAdjacentMines !== 0
                      ) && numAdjacentMines}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </Content>
    </>
  );
};

Minesweeper.displayName = "Minesweeper";
