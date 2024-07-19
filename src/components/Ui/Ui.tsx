import {
  Dispatch,
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";

import { Deskbar } from "./components/Deskbar";
import { Desktop } from "./components/Desktop";
import { Windows } from "./components/Windows";
import { Dialog } from "components/Dialog";
import { ErrorBoundary } from "components/ErrorBoundary";
import { IsDebugModeContext, StateContext } from "contexts";
import { Action, State } from "types";

// @todo move this into another file
const INITIAL_STATE: State = {
  windows: [
    {
      focused: true,
      height: 300,
      hidden: false,
      id: "window-id-1",
      left: 96,
      title: "Window…",
      titleBarLeft: 0,
      top: 96,
      width: 480,
      zoomed: false,
    },
  ],
};

// @todo move this into another file
const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "BLUR":
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (action.payload.ids.includes(window.id)) {
            return {
              ...window,
              focus: false,
            };
          }

          return window;
        }),
      };
    case "CLOSE":
      return {
        ...state,
        windows: state.windows.filter(
          (window) =>
            action.payload.type === "window" &&
            !action.payload.ids.includes(window.id)
        ),
      };
    case "FOCUS":
      return {
        ...state,
        windows: state.windows.map((window) => ({
          ...window,
          focused: action.payload.ids.includes(window.id),
        })),
      };
    case "HIDE":
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (action.payload.ids.includes(window.id)) {
            return {
              ...window,
              hidden: true,
            };
          }

          return window;
        }),
      };
    case "MOVE":
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (action.payload.ids.includes(window.id)) {
            if (action.payload.type === "titleBar") {
              return {
                ...window,
                titleBarLeft: action.payload.left,
              };
            }

            return {
              ...window,
              left: action.payload.left,
              top: action.payload.top,
            };
          }

          return window;
        }),
      };
    case "RESIZE":
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (action.payload.ids.includes(window.id)) {
            return {
              ...window,
              height: action.payload.height,
              width: action.payload.width,
            };
          }

          return window;
        }),
      };
    case "SHOW":
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (action.payload.ids.includes(window.id)) {
            return {
              ...window,
              hidden: false,
            };
          }

          return window;
        }),
      };
    case "ZOOM":
      return {
        ...state,
        windows: state.windows.map((window) => {
          if (action.payload.ids.includes(window.id)) {
            return {
              ...window,
              zoomed: !window.zoomed,
            };
          }

          return window;
        }),
      };
    default:
      return state;
  }
};

export const Ui: FunctionComponent<{}> = () => {
  const isDebugMode = useContext(IsDebugModeContext);
  const [state, _dispatch] = useReducer(reducer, INITIAL_STATE);

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

  return (
    <StateContext.Provider value={value}>
      <ErrorBoundary
        fallback={
          <Dialog text="An unknown error has occured. Please reload the page." />
        }>
        <Desktop />
        <Deskbar />
        <Windows />
      </ErrorBoundary>
    </StateContext.Provider>
  );
};
