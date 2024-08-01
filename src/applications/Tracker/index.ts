import { ApplicationConfiguration } from "@/types";

import { Tracker } from "./Tracker";
import { TrackerIcon } from "./TrackerIcon";

export const APPLICATION_TRACKER: ApplicationConfiguration = {
  Component: Tracker,
  Icon: TrackerIcon,
  id: "application-tracker",
  title: "Tracker",
};
