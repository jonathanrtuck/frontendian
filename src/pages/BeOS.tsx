import { Text } from "@/icons";
import { type FunctionComponent } from "react";
import { Link } from "react-router";

export const BeOS: FunctionComponent = () => (
  <>
    <link href="/themes/mac-os-classic/styles.css" rel="stylesheet" />
    beos…
    <Link to="/mac-os-classic">mac-os-classic</Link>
    <Text />
  </>
);
