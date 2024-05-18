import clsx from "clsx";
import { Dispatch, FunctionComponent } from "react";

import { Action, Coordinates, State } from "../../../../types";

import styles from "./Square.module.css";

export const Square: FunctionComponent<{
  columnIndex: number;
  dispatch: Dispatch<Action>;
  rowIndex: number;
  state: State;
}> = ({ columnIndex, dispatch, rowIndex, state }) => {
  const { isLost, isWon } = state;
  const { hasFlag, hasMine, isRevealed, numAdjacentMines } =
    state.squares[rowIndex][columnIndex];
  const coordinates: Coordinates = [rowIndex, columnIndex];
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
      onClick={
        isRevealed || isGameOver || hasFlag
          ? undefined
          : () => {
              dispatch({
                coordinates,
                type: "reveal",
              });
            }
      }
      onContextMenu={
        isRevealed || isGameOver
          ? undefined
          : () => {
              dispatch({
                coordinates,
                type: "flag",
              });
            }
      }
      type="button"
      tabIndex={0}>
      {isRevealedMine && "💣"}
      {hasFlag && (isLost && !hasMine ? "💣" : "🚩")}
      {isWon && hasMine && "🚩"}
      {isRevealed &&
        !isRevealedMine &&
        numAdjacentMines !== 0 &&
        numAdjacentMines}
    </button>
  );
};
