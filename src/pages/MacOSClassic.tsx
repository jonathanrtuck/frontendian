import type { FunctionComponent } from "react";
import { Link } from "react-router";

export const MacOSClassic: FunctionComponent = () => (
  <>
    <link href="/themes/beos/styles.css" rel="stylesheet" />
    <Link to="/beos">beos</Link>
    …mac-os-classic
  </>
);
