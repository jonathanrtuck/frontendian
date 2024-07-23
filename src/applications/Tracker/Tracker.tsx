import { FunctionComponent } from "react";

import { Tracker as Icon } from "icons";
import { Application, ApplicationComponentProps } from "types";

const Component: FunctionComponent<ApplicationComponentProps> = () => null;

Component.displayName = "Tracker";

export const APPLICATION_TRACKER: Application = {
  Component,
  Icon,
  id: "application-tracker",
  title: "Tracker",
  windowIds: [],
};
