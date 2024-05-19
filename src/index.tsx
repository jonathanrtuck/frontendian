import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Dispatch,
  FunctionComponent,
  StrictMode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { createRoot } from "react-dom/client";

import { Deskbar } from "components/Deskbar";
import { Desktop } from "components/Desktop";
import { Window } from "components/Window";
import reportWebVitals from "reportWebVitals";
import {
  Action,
  FILE_ABOUT,
  INITIAL_STATE,
  State,
  StateContext,
  stateReducer,
} from "state";

import "./index.css";

const IS_DEBUG_MODE = false;
const QUERY_CLIENT = new QueryClient();

// @todo add ErrorBoundary
const Ui: FunctionComponent<{}> = () => {
  const [state, _dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const dispatch = useCallback(
    (action: Action) => {
      if (IS_DEBUG_MODE) {
        console.debug("action", action);
      }

      _dispatch(action);
    },
    [_dispatch]
  );

  const value = useMemo<[State, Dispatch<Action>]>(
    () => [state, dispatch],
    [dispatch, state]
  );

  useEffect(() => {
    if (IS_DEBUG_MODE) {
      console.debug("state", state);
    }
  }, [state]);

  useEffect(() => {
    dispatch({
      payload: {
        ids: [FILE_ABOUT.id],
        type: "file",
      },
      type: "OPEN",
    });
  }, [dispatch]);

  return (
    <StateContext.Provider value={value}>
      <Desktop />
      <Deskbar />
      {state.windows.map((window) => {
        const application = state.applications.find(({ windowIds }) =>
          windowIds.includes(window.id)
        );
        const stackingIndex = state.stackingOrder.indexOf(window.id);

        return application ? (
          <Window
            Component={application?.Component}
            key={window.id}
            stackingIndex={stackingIndex}
            window={window}
          />
        ) : null;
      })}
    </StateContext.Provider>
  );
};

createRoot(document.body).render(
  <StrictMode>
    <QueryClientProvider client={QUERY_CLIENT}>
      <Ui />
    </QueryClientProvider>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(IS_DEBUG_MODE ? console.debug : undefined);
