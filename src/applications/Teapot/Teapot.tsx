import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { main } from "./weblgl";
import { Menubaritem, useMenubar } from "components/Menubar";
import { Teapot as Icon } from "icons";
import {
  Application,
  ApplicationComponentProps,
  ApplicationComponentRef,
} from "state/types";

import styles from "./Teapot.module.css";

// @see https://en.wikipedia.org/wiki/Utah_teapot
const Teapot = forwardRef<ApplicationComponentRef, ApplicationComponentProps>(
  ({ onQuit }, ref) => {
    const rootRef = useRef<HTMLCanvasElement>(null);

    useImperativeHandle(ref, () => ({}), []);

    const menubaritems = useMemo<Menubaritem[]>(
      () => [
        {
          items: [
            {
              onClick: onQuit,
              title: "Quit",
            },
          ],
          title: "File",
        },
      ],
      [onQuit]
    );

    useMenubar(menubaritems);

    useEffect(() => {
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
