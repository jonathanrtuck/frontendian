import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { Deskbar } from "components/Deskbar";
import { Desktop } from "components/Desktop";
import { ErrorBoundary } from "components/ErrorBoundary";
import { Window } from "components/Window";
import { FILE_README_MD } from "files";
import {
  Action,
  INITIAL_STATE,
  State,
  StateContext,
  stateReducer,
} from "state";

import styles from "./App.module.css";

export const App: FunctionComponent<{
  isDebugMode: boolean;
}> = ({ isDebugMode }) => {
  const [state, _dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const dispatch = useCallback(
    (action: Action) => {
      if (isDebugMode) {
        // eslint-disable-next-line no-console
        console.debug("action", action);
      }

      _dispatch(action);
    },
    [isDebugMode]
  );

  const value = useMemo<[State, Dispatch<Action>]>(
    () => [state, dispatch],
    [dispatch, state]
  );

  useEffect(() => {
    if (isDebugMode) {
      // eslint-disable-next-line no-console
      console.debug("state", state);
    }
  }, [isDebugMode, state]);

  useEffect(() => {
    dispatch({
      payload: {
        ids: [FILE_README_MD.id],
        type: "file",
      },
      type: "OPEN",
    });
  }, [dispatch]);

  return (
    <ErrorBoundary
      fallback={
        <dialog className={styles.errorDialog} open>
          <p>An unknown error has occured.</p>
          <p>Please reload the page.</p>
        </dialog>
      }>
      <StateContext.Provider value={value}>
        <Desktop />
        <Deskbar />
        {state.windows.map((window) => {
          const application = state.applications.find(({ windowIds }) =>
            windowIds.includes(window.id)
          );

          return application ? (
            <Window
              Component={application.Component}
              key={window.id}
              style={{
                zIndex: state.stackingOrder.indexOf(window.id),
              }}
              {...window}
            />
          ) : null;
        })}
      </StateContext.Provider>
    </ErrorBoundary>
  );
};
