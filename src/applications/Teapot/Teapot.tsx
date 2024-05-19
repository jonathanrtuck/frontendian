import {
  forwardRef,
  useContext,
  useLayoutEffect,
  useMemo,
  useRef,
} from "react";

import { main } from "./Teapot.weblgl";
import { Menubaritem, useMenubar } from "components/Menubar";
import {
  ApplicationComponentProps,
  ApplicationComponentRef,
  StateContext,
} from "state";

import styles from "./Teapot.module.css";

export const Teapot = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ application }, ref) => {
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
});
