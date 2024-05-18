import { Reducer } from "react";

import { Action, Coordinates, State } from "./types";
import {
  getAdjacentSquareCoordinates,
  getInitialSquares,
  getIsLost,
  getIsWon,
  getMineCoordinates,
  isEqualCoordinates,
} from "./utils";

// @recursive
const revealSquare =
  (state: State) =>
  (coordinates: Coordinates): State => {
    const [rowIndex, columnIndex] = coordinates;
    const square = state.squares[rowIndex][columnIndex];
    const { hasMine, isRevealed, numAdjacentMines } = square;

    if (isRevealed) {
      return state;
    }

    const isEqualCoordinatesTo = isEqualCoordinates(coordinates);
    const nextState = {
      ...state,
      squares: state.squares.map((row, rowIndex) =>
        row.map((square, columnIndex) => ({
          ...square,
          isRevealed:
            isEqualCoordinatesTo([rowIndex, columnIndex]) || square.isRevealed,
        }))
      ),
    };

    if (!hasMine && numAdjacentMines === 0) {
      const adjacentSquareCoordinates =
        getAdjacentSquareCoordinates(nextState)(coordinates);

      return adjacentSquareCoordinates.reduce(
        (acc, coordinates) => revealSquare(acc)(coordinates),
        nextState
      );
    }

    return nextState;
  };

export const reducer: Reducer<State, Action> = (prevState, action) => {
  switch (action.type) {
    case "flag": {
      const [rowIndex, columnIndex] = action.coordinates;
      const isAlreadyFlagged = prevState.squares[rowIndex][columnIndex].hasFlag;

      return {
        ...prevState,
        flagsRemaining: prevState.flagsRemaining + (isAlreadyFlagged ? 1 : -1),
        squares: prevState.squares.map((row, i) =>
          row.map((square, j) =>
            i === rowIndex && j === columnIndex
              ? {
                  ...square,
                  hasFlag: !isAlreadyFlagged,
                }
              : square
          )
        ),
      };
    }
    case "reveal": {
      if (prevState.elapsedTime === 0) {
        const mineCoordinates = getMineCoordinates(
          prevState,
          action.coordinates
        );
        const stateWithMines: State = {
          ...prevState,
          squares: prevState.squares.map((row, rowIndex) =>
            row.map((square, columnIndex) => ({
              ...square,
              hasMine: mineCoordinates.some(
                isEqualCoordinates([rowIndex, columnIndex])
              ),
            }))
          ),
        };
        const getAdjacentSquareCoordinatesByCoordinates =
          getAdjacentSquareCoordinates(stateWithMines);
        const nextState: State = {
          ...stateWithMines,
          elapsedTime: 1,
          isWon: getIsWon(stateWithMines),
          squares: stateWithMines.squares.map((row, rowIndex) =>
            row.map((square, columnIndex) => ({
              ...square,
              numAdjacentMines: getAdjacentSquareCoordinatesByCoordinates([
                rowIndex,
                columnIndex,
              ])
                .map(
                  ([rowIndex, columnIndex]) =>
                    stateWithMines.squares[rowIndex][columnIndex]
                )
                .reduce((acc, { hasMine }) => acc + (hasMine ? 1 : 0), 0),
            }))
          ),
        };

        return revealSquare(nextState)(action.coordinates);
      }

      const nextState = revealSquare(prevState)(action.coordinates);

      return {
        ...nextState,
        isLost: getIsLost(nextState),
        isWon: getIsWon(nextState),
      };
    }
    case "reset":
      return {
        ...prevState,
        elapsedTime: 0,
        flagsRemaining: prevState.numMines,
        isLost: false,
        isWon: false,
        squares: getInitialSquares(prevState.numRows, prevState.numColumns),
      };
    case "tick":
      return {
        ...prevState,
        elapsedTime: prevState.elapsedTime + 1,
      };
    default:
      return prevState;
  }
};
