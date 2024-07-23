import { FunctionComponent } from "react";

import { Teapot as Icon } from "icons";
import { Application, ApplicationComponentProps } from "types";

const Component: FunctionComponent<ApplicationComponentProps> = () => null;

Component.displayName = "Teapot";

export const APPLICATION_TEAPOT: Application = {
  Component,
  Icon,
  id: "application-teapot",
  title: "Teapot",
  windowIds: [],
};
