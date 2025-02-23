import type { FunctionComponent, PropsWithChildren } from "react";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <>
    <link href="/themes/beos/styles.css" rel="stylesheet" />
    {children}
  </>
);

export default Layout;
