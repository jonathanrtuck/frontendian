"use client";

import "./Teapot.css";
import { main } from "./webgl";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import { useStore } from "@/store";
import type { Application } from "@/types";
import { useEffect, useRef } from "react";

// @see https://en.wikipedia.org/wiki/Utah_teapot
export const Teapot: Application["Component"] = () => {
  const closeApplication = useStore((store) => store.closeApplication);
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
      </Menubar>
      <Content>
        <canvas className="teapot" ref={rootRef} />
      </Content>
    </>
  );
};

Teapot.displayName = "Teapot";
