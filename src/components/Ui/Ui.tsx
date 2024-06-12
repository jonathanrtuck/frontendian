import {
  Dispatch,
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { Helmet } from "react-helmet";

import { Deskbar } from "components/Deskbar";
import { Desktop } from "components/Desktop";
import { ErrorBoundary } from "components/ErrorBoundary";
import { Window } from "components/Window";
import { FILE_README_MD } from "files";
import {
  Action,
  File,
  Font,
  INITIAL_STATE,
  State,
  StateContext,
  stateReducer,
} from "state";

import styles from "./Ui.module.css";

export const Ui: FunctionComponent<{
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

  const externalFiles = useMemo<File[]>(
    () =>
      state.files.filter(
        ({ url }) => !url.startsWith(`${process.env.PUBLIC_URL}/`)
      ),
    [state.files]
  );
  const fonts = useMemo<Font[]>(
    () => state.applications.map(({ fonts = [] }) => fonts).flat(),
    [state.applications]
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
    <>
      <Helmet
        style={fonts.map(({ format, publicUrl, title }) => ({
          cssText: `
@font-face {
  font-family: "${title}";
  src: url("${process.env.PUBLIC_URL}${publicUrl}") format("${format}");
}
`,
        }))}>
        {externalFiles.map(({ id, url }) => (
          <link href={url} key={id} rel="preconnect" />
        ))}
        {fonts.map(({ publicUrl }) => (
          <link
            as="font"
            crossOrigin=""
            href={`${process.env.PUBLIC_URL}${publicUrl}`}
            key={publicUrl}
            rel="preload"
          />
        ))}
      </Helmet>
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
    </>
  );
};
