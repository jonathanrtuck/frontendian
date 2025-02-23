import type { FunctionComponent, PropsWithChildren } from "react";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <>
    <link href="/themes/mac-os-classic/styles.css" rel="stylesheet" />
    {children}
  </>
);

export default Layout;
