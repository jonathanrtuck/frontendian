import { useEffect, useRef } from "react";

import { ApplicationComponent } from "@/types";

import { main } from "./webgl";

import styles from "./Teapot.module.css";

// @see https://en.wikipedia.org/wiki/Utah_teapot
export const Teapot: ApplicationComponent = ({ Content }) => {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (rootRef.current) {
      main(rootRef.current);
    }
  }, []);

  return (
    <Content>
      <canvas className={styles.root} ref={rootRef} />
    </Content>
  );
};
