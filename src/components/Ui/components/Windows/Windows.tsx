import { FunctionComponent } from "react";

import { Window } from "./components/Window";
import { Window as WindowType } from "types";

const WINDOWS: WindowType[] = [
  {
    focused: true,
    height: 300,
    hidden: false,
    id: "window-id-1",
    left: 96,
    title: "Window…",
    titleBarLeft: 0,
    top: 96,
    width: 480,
    zoomed: false,
  },
];

export const Windows: FunctionComponent<{}> = () => (
  <>
    {WINDOWS.map((window) => (
      <Window key={window.id} {...window} />
    ))}
  </>
);
