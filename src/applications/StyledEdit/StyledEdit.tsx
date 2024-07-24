import { FunctionComponent } from "react";

import { StyledEdit as Icon } from "@/icons";
import { ApplicationComponent, ApplicationComponentProps } from "@/types";

const Component: FunctionComponent<ApplicationComponentProps> = () => null;

Component.displayName = "StyledEdit";

export const APPLICATION_STYLED_EDIT: ApplicationComponent = {
  Component,
  Icon,
  id: "application-styled-edit",
  title: "StyledEdit",
};
