"use client";

import styles from "./Teapot.module.css";
import { AboutTeapot } from "./AboutTeapot";
import { main } from "./webgl";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import type { Application } from "@/types";
import { useEffect, useRef } from "react";

// @see https://en.wikipedia.org/wiki/Utah_teapot
export const Teapot: Application["Component"] = () => {
  const closeApplication = useStore((store) => store.closeApplication);
  const openDialog = useStore((store) => store.openDialog);
  const openWindow = useStore((store) => store.openWindow);
  const theme = useTheme();
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
              onClick={() =>
                theme === "mac-os-classic"
                  ? openWindow({
                      Component: AboutTeapot,
                      id: "application-teapot",
                    })
                  : openDialog({
                      Component: AboutTeapot,
                      title: "About Teapot",
                    })
              }
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
