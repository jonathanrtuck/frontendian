import { FunctionComponent, useEffect, useRef } from "react";

import { Teapot as Icon } from "@/icons";
import { ApplicationComponent, ApplicationComponentProps } from "@/types";

import { main } from "./webgl";

import styles from "./Teapot.module.css";

// @see https://en.wikipedia.org/wiki/Utah_teapot
const Component: FunctionComponent<ApplicationComponentProps> = ({
  useMenuItems,
}) => {
  const rootRef = useRef<HTMLCanvasElement>(null);

  useMenuItems([], []); // @todo

  useEffect(() => {
    if (rootRef.current) {
      main(rootRef.current);
    }
  }, []);

  return <canvas className={styles.root} ref={rootRef} />;
};

Component.displayName = "Teapot";

export const APPLICATION_TEAPOT: ApplicationComponent = {
  Component,
  Icon,
  id: "application-teapot",
  title: "Teapot",
};
