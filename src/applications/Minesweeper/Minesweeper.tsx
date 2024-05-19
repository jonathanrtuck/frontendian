import {
  forwardRef,
  Reducer,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

import { Board } from "./components/Board";
import { BEGINNER_STATE } from "./constants";
import { reducer } from "./state";
import { Action, State } from "./types";
import { Menubaritem, useMenubar } from "components/Menubar";
import {
  APPLICATION_MINESWEEPER,
  ApplicationComponentProps,
  ApplicationComponentRef,
  StateContext,
} from "state";

import styles from "./Minesweeper.module.css";

// @see https://github.com/jonathanrtuck/minesweeper
export const Minesweeper = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ application, window: { id: windowId } }, ref) => {
  const [, dispatch] = useContext(StateContext);

  const intervalRef = useRef<number>(0);

  const [gameState, gameDispatch] = useReducer<Reducer<State, Action>>(
    reducer,
    BEGINNER_STATE
  );

  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: () => {
              const newWindow = APPLICATION_MINESWEEPER.getWindow?.();

              // reset window dimensions
              if (newWindow?.height && newWindow?.width) {
                dispatch({
                  payload: {
                    height: newWindow.height,
                    ids: [windowId],
                    width: newWindow.width,
                  },
                  type: "RESIZE",
                });
              }

              gameDispatch({
                type: "reset",
              });
            },
            title: "New",
          },
          null,
          {
            onClick: () => {
              dispatch({
                payload: {
                  ids: [application.id],
                  type: "application",
                },
                type: "CLOSE",
              });
            },
            title: "Quit",
          },
        ],
        title: "File",
      },
    ],
    [application.id, dispatch, windowId]
  );

  useMenubar(menubaritems);

  useEffect(() => {
    if (gameState.elapsedTime === 1) {
      intervalRef.current = window.setInterval(() => {
        gameDispatch({
          type: "tick",
        });
      }, 1000);
    }

    if (gameState.elapsedTime === 0 || gameState.elapsedTime === 999) {
      window.clearInterval(intervalRef.current);
    }
  }, [gameState.elapsedTime]);

  useEffect(() => {
    if (gameState.isLost || gameState.isWon) {
      window.clearInterval(intervalRef.current);
    }
  }, [gameState]);

  useEffect(
    () => () => {
      window.clearInterval(intervalRef.current);
    },
    []
  );

  return (
    <div className={styles.root}>
      <Board dispatch={gameDispatch} state={gameState} />
    </div>
  );
});
