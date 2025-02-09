"use client";

import styles from "./Teapot.module.css";
import { ApplicationComponent } from "@/types";
import { useEffect, useRef } from "react";
import { main } from "./webgl";

// @see https://en.wikipedia.org/wiki/Utah_teapot
export const Teapot: ApplicationComponent = ({
  Content,
  Menu,
  Menubar,
  Menuitem,
  onAbout,
  onQuit,
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
            <Menuitem onClick={onQuit} title="Quit" />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                onAbout(
                  <p>
                    WebGL rendering of the{" "}
                    <a href="https://en.wikipedia.org/wiki/Utah_teapot">
                      Utah Teapot
                    </a>
                    .
                  </p>
                );
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

Teapot.displayName = "Teapot";
