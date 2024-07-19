import {
  ForwardRefExoticComponent,
  FunctionComponent,
  RefAttributes,
  SVGAttributes,
} from "react";

import styles from "./TrayIcon.module.css";

export const TrayIcon: FunctionComponent<{
  Icon: ForwardRefExoticComponent<
    SVGAttributes<SVGSVGElement> & RefAttributes<SVGSVGElement>
  >;
}> = ({ Icon }) => (
  <li className={styles.root}>
    <Icon />
  </li>
);
