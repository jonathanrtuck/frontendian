import { forwardRef } from "react";

import { Tracker as Icon } from "icons";
import {
  Application,
  ApplicationComponentProps,
  ApplicationComponentRef,
} from "state";

const Tracker = forwardRef<ApplicationComponentRef, ApplicationComponentProps>(
  (props, ref) => null
);

export const APPLICATION_TRACKER: Application = {
  Component: Tracker,
  icon: <Icon />,
  id: "application-tracker",
  title: "Tracker",
  windowIds: [],
};
