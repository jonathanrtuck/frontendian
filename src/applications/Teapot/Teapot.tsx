"use client";

import styles from "./Teapot.module.css";
import { main } from "./webgl";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import { useStore } from "@/store";
import type { Application } from "@/types";
import { useEffect, useRef } from "react";

// @see https://en.wikipedia.org/wiki/Utah_teapot
export const Teapot: Application["Component"] = ({ fileId, windowId }) => {
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
                // @todo
              }}
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                // @todo
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
