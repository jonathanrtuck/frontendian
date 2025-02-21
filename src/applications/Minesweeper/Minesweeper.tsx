"use client";

import "./Minesweeper.css";
import { AboutMinesweeper } from "./AboutMinesweeper";
import {
  BORDER_SIZE,
  DEFAULT_LEVEL,
  DEFAULT_STATE,
  HEADER_HEIGHT,
  LEVELS,
  PADDING_SIZE,
  SQUARE_SIZE,
} from "./constants";
import type { Coordinates, Level, Square } from "./types";
import {
  getAdjacentSquareCoordinates,
  getMineCoordinates,
  isEqualCoordinates,
  revealSquare,
} from "./utils";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import type { Application } from "@/types";
import clsx from "clsx";
import type { CSSProperties } from "react";
import { useEffect, useRef, useState } from "react";

// @see https://github.com/jonathanrtuck/minesweeper
export const Minesweeper: Application["Component"] = ({ windowId }) => {
  const closeApplication = useStore((store) => store.closeApplication);
  const openDialog = useStore((store) => store.openDialog);
  const openWindow = useStore((store) => store.openWindow);
  const resizeWindow = useStore((store) => store.resizeWindow);
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
                // reset window dimensions
                resizeWindow({
                  height: DEFAULT_STATE[level].height,
                  id: windowId,
                  width: DEFAULT_STATE[level].width,
                });
              }}
              title="New"
            />
            <Menuitem separator />
            {LEVELS.map(([lvl, title]) => (
              <Menuitem
                checked={level === lvl}
                key={lvl}
                onClick={() => {
                  const { flagsRemaining, height, squares, width } =
                    DEFAULT_STATE[lvl];

                  setElapsedTime(0);
                  setFlagsRemaining(flagsRemaining);
                  setLevel(lvl);
                  setSquares(squares);
                  // update window dimensions
                  resizeWindow({
                    height,
                    id: windowId,
                    width,
                  });
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
        <div
          className="minesweeper"
          onContextMenu={(e) => e.preventDefault()}
          style={
            {
              "--minesweeper-border-size": `${BORDER_SIZE}px`,
              "--minesweeper-header-height": `${HEADER_HEIGHT}px`,
              "--minesweeper-padding-size": `${PADDING_SIZE}px`,
              "--minesweeper-square-size": `${SQUARE_SIZE}px`,
            } as CSSProperties
          }>
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
