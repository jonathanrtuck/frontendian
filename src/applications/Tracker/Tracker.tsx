import { FunctionComponent } from "react";

import { Tracker as Icon } from "@/icons";
import { ApplicationComponent, ApplicationComponentProps } from "@/types";

// @todo
const Component: FunctionComponent<ApplicationComponentProps> = () => null;

Component.displayName = "Tracker";

export const APPLICATION_TRACKER: ApplicationComponent = {
  Component,
  Icon,
  id: "application-tracker",
  title: "Tracker",
};
