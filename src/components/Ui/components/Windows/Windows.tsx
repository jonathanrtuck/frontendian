import { FunctionComponent } from "react";

import { Window } from "./components/Window";
import { Window as WindowType } from "types";

const WINDOWS: WindowType[] = [
  {
    height: 300,
    id: "window-id-1",
    left: 96,
    title: "Window…",
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
