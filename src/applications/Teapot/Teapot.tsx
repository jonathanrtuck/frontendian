import {
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { main } from "./Teapot.weblgl";
import { Menubaritem, useMenubar } from "components/Menubar";
import { Teapot as Icon } from "icons";
import { StateContext } from "state/context";
import {
  Application,
  ApplicationComponentProps,
  ApplicationComponentRef,
} from "state/types";

import styles from "./Teapot.module.css";

const Teapot = forwardRef<ApplicationComponentRef, ApplicationComponentProps>(
  ({ application }, ref) => {
    const [, dispatch] = useContext(StateContext);

    const rootRef = useRef<HTMLCanvasElement>(null);

    const menubaritems = useMemo<Menubaritem[]>(
      () => [
        {
          items: [
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
      [application.id, dispatch]
    );

    useMenubar(menubaritems);

    useLayoutEffect(() => {
      if (rootRef.current) {
        main(rootRef.current);
      }
    });

    return <canvas className={styles.root} ref={rootRef} />;
  }
);

export const APPLICATION_TEAPOT: Application = {
  Component: Teapot,
  getWindow: () => ({
    height: 300,
    title: "Teapot",
    width: 300,
  }),
  icon: <Icon />,
  id: "application-teapot",
  title: "Teapot",
  windowIds: [],
};
