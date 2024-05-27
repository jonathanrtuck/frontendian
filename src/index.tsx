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
import { FILE_README_MD } from "files";
import reportWebVitals from "reportWebVitals";
import {
  Action,
  INITIAL_STATE,
  State,
  StateContext,
  stateReducer,
} from "state";

import "./index.css";

const IS_DEBUG_MODE = false;

// eslint-disable-next-line no-console
reportWebVitals(IS_DEBUG_MODE ? console.debug : undefined);

// @todo add ErrorBoundary
const App: FunctionComponent<{}> = () => {
  const [state, _dispatch] = useReducer(stateReducer, INITIAL_STATE);

  const dispatch = useCallback(
    (action: Action) => {
      if (IS_DEBUG_MODE) {
        // eslint-disable-next-line no-console
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
      // eslint-disable-next-line no-console
      console.debug("state", state);
    }
  }, [state]);

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
    <StateContext.Provider value={value}>
      <Desktop />
      <Deskbar />
      {state.windows.map((window) => {
        const application = state.applications.find(({ windowIds }) =>
          windowIds.includes(window.id)
        );

        return application ? (
          <Window
            Component={application?.Component}
            key={window.id}
            style={{
              zIndex: state.stackingOrder.indexOf(window.id),
            }}
            {...window}
          />
        ) : null;
      })}
    </StateContext.Provider>
  );
};

createRoot(document.body).render(
  <StrictMode>
    <App />
  </StrictMode>
);
