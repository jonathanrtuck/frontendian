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
  ({ onAbout, onQuit }, ref) => {
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
        {
          items: [
            {
              onClick: onAbout,
              title: `About ${APPLICATION_TEAPOT.title}…`,
            },
          ],
          title: "Help",
        },
      ],
      [onAbout, onQuit]
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
  about: (
    <>
      <p>
        WebGL rendering of the{" "}
        <a href="https://en.wikipedia.org/wiki/Utah_teapot">Utah Teapot</a>.
      </p>
    </>
  ),
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
