import { useEffect, useRef } from "react";

import { ApplicationComponent } from "@/types";

import { main } from "./webgl";

import styles from "./Teapot.module.css";

// @see https://en.wikipedia.org/wiki/Utah_teapot
export const Teapot: ApplicationComponent = ({
  Content,
  Menu,
  Menubar,
  Menuitem,
}) => {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      main(rootRef.current);
    }
  }, []);

  return (
    <>
      <Menubar>
        <Menuitem title="File">
          <Menu>
            <Menuitem
              onClick={() => {
                console.debug("quit…");
              }}
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                console.debug("about…");
              }}
              title="About Teapot…"
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content>
        <canvas className={styles.root} ref={rootRef} />
      </Content>
    </>
  );
};
