import { FunctionComponent } from "react";

import { MenuItem } from "components/MenuItem";
import { Tracker as Icon } from "icons";
import { Application, ApplicationComponentProps } from "types";

const Component: FunctionComponent<ApplicationComponentProps> = ({
  useMenuItems,
}) => {
  useMenuItems(
    [
      <MenuItem key="file" title="File" />,
      <MenuItem key="edit" title="Edit" />,
      <MenuItem key="view" title="View" />,
    ],
    []
  );

  return <h1>tracker</h1>;
};

Component.displayName = "Tracker";

export const APPLICATION_TRACKER: Application = {
  Component,
  Icon,
  id: "application-tracker",
  title: "Tracker",
  windowIds: [],
};
