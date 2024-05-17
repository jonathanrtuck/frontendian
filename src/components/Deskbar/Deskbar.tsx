import {
  FunctionComponent,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { Calendar } from "./components/Calendar";
import { Menubar, Menubaritem } from "components/Menubar";
import { APPLICATION_TRACKER_ID, DESKBAR_ID, FILE_ABOUT } from "consts";
import { StateContext } from "contexts";
import { Network, WindowHidden, WindowVisible } from "icons";
import { Application, Window } from "types";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent<{}> = () => {
  const [state, dispatch] = useContext(StateContext);

  const clockRef = useRef<HTMLTimeElement>(null);
  const rootRef = useRef<HTMLElement>(null);

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false);

  const openApplications = useMemo<Application[]>(
    () =>
      state.openApplicationIds
        .map((id) =>
          state.applications.find((application) => application.id === id)
        )
        .filter(Boolean) as Application[],
    [state.applications, state.openApplicationIds]
  );
  const applicationMenubaritems = useMemo<Menubaritem[]>(
    () =>
      openApplications
        .map(({ id, title, windowIds }) => {
          const menubaritem = {
            icon: state.types[id]?.icon,
            items: [],
            title,
          };

          const hasWindows = windowIds.length !== 0;

          if (!hasWindows) {
            return {
              ...menubaritem,
              items: [
                {
                  title: "No windows",
                },
              ],
            };
          }

          const windows = windowIds
            .map((windowId) =>
              state.windows.find((window) => window.id === windowId)
            )
            .filter(Boolean) as Window[];
          const isEveryWindowHidden = windows.every(({ hidden }) => hidden);
          const isEveryWindowVisible = windows.every(({ hidden }) => !hidden);

          return {
            ...menubaritem,
            items: [
              ...windows.map((window) => ({
                icon: window.hidden ? <WindowHidden /> : <WindowVisible />,
                onClick: () => {
                  dispatch({
                    payload: {
                      ids: [window.id],
                    },
                    type: window.hidden ? "SHOW" : "FOCUS",
                  });
                },
                title: window.title,
              })),
              null,
              {
                onClick: isEveryWindowHidden
                  ? undefined
                  : () => {
                      dispatch({
                        payload: {
                          ids: windowIds,
                        },
                        type: "HIDE",
                      });
                    },
                title: "Hide all",
              },
              {
                onClick: isEveryWindowVisible
                  ? undefined
                  : () => {
                      dispatch({
                        payload: {
                          ids: windowIds,
                        },
                        type: "SHOW",
                      });
                    },
                title: "Show all",
              },
              {
                onClick: () => {
                  dispatch({
                    payload: {
                      ids: [id],
                      type: "application",
                    },
                    type: "CLOSE",
                  });
                },
                title: "Close all",
              },
            ],
          };
        })
        .filter(Boolean) as Menubaritem[],
    [dispatch, openApplications, state.types, state.windows]
  );
  const logoMenubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: () => {
              dispatch({
                payload: {
                  ids: [FILE_ABOUT.id],
                  type: "file",
                },
                type: "OPEN",
              });
            },
            title: FILE_ABOUT.title,
          },
          null,
          ...state.applications
            .filter(({ id }) => id !== APPLICATION_TRACKER_ID)
            .map(({ id, title }) => ({
              icon: state.types[id]?.icon,
              onClick: () => {
                dispatch({
                  payload: {
                    ids: [id],
                    type: "application",
                  },
                  type: "OPEN",
                });
              },
              title,
            })),
        ],
        title: "frontendian",
      },
    ],
    [dispatch, state.applications, state.types]
  );

  const setTime = useCallback((date: Date) => {
    const rootElement = clockRef.current;

    if (rootElement) {
      // imperatively update the DOM in order to prevent frequent re-renders
      rootElement.setAttribute("datetime", date.toISOString());
      rootElement.setAttribute(
        "title",
        date.toLocaleDateString(navigator.language, {
          dateStyle: "full",
        })
      );
      rootElement.textContent = date.toLocaleTimeString(navigator.language);
    }
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    // first use timeout in order to get second tick interval to align with system clock
    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        setTime(new Date());
      }, 1000);

      setTime(new Date());
    }, 1000 - new Date().getMilliseconds());

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [setTime]);

  return (
    <header
      className={styles.root}
      onFocus={({ relatedTarget }) => {
        if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
          dispatch({
            payload: {
              ids: [DESKBAR_ID],
            },
            type: "FOCUS",
          });
        }
      }}
      ref={rootRef}
      role="menubar"
      style={{
        zIndex: state.stackingOrder.indexOf(DESKBAR_ID),
      }}>
      <Menubar
        classes={{
          label: styles.logoLabel,
          menubaritem: styles.logoMenubaritem,
        }}
        className={styles.logo}
        items={logoMenubaritems}
        orientation="vertical"
      />
      <div className={styles.tray}>
        <ul className={styles.icons}>
          <Network className={styles.icon} />
        </ul>
        <time
          aria-expanded={isCalendarOpen}
          aria-haspopup="menu"
          className={styles.clock}
          onClick={() => {
            setIsCalendarOpen(true);
          }}
          ref={clockRef}
        />
      </div>
      <Menubar
        className={styles.applications}
        items={applicationMenubaritems}
        orientation="vertical"
      />
      {isCalendarOpen && (
        <Calendar
          onClose={() => {
            setIsCalendarOpen(false);
          }}
        />
      )}
    </header>
  );
};
