import { FunctionComponent } from "react";

import { Minesweeper as Icon } from "icons";
import { Application, ApplicationComponentProps } from "types";

const Component: FunctionComponent<ApplicationComponentProps> = () => null;

Component.displayName = "Minesweeper";

export const APPLICATION_MINESWEEPER: Application = {
  Component,
  Icon,
  id: "application-minesweeper",
  title: "Minesweeper",
  windowIds: [],
};
