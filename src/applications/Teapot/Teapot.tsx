import { FunctionComponent } from "react";

import { Teapot as Icon } from "icons";
import { ApplicationComponent, ApplicationComponentProps } from "types";

const Component: FunctionComponent<ApplicationComponentProps> = () => null;

Component.displayName = "Teapot";

export const APPLICATION_TEAPOT: ApplicationComponent = {
  Component,
  Icon,
  id: "application-teapot",
  title: "Teapot",
};
