import {
  Children,
  type FunctionComponent,
  type PropsWithChildren,
} from "react";

export const TrayIcons: FunctionComponent<PropsWithChildren> = ({
  children,
}) => (
  <menu className="tray-icons">
    {Children.map(children, (child) => (
      <li>{child}</li>
    ))}
  </menu>
);
