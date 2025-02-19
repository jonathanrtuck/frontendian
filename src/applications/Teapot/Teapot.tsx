"use client";

import styles from "./Teapot.module.css";
import { main } from "./webgl";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import { useStore } from "@/store";
import type { Application } from "@/types";
import { useEffect, useRef } from "react";

// @see https://en.wikipedia.org/wiki/Utah_teapot
export const Teapot: Application["Component"] = () => {
  const closeApplication = useStore((store) => store.closeApplication);
  const openDialog = useStore((store) => store.openDialog);
  const openWindow = useStore((store) => store.openWindow);
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
              onClick={() => closeApplication({ id: "application-teapot" })}
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                // @todo openDialog or openWindow
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
