import "./blog.css";
import { type FunctionComponent, type PropsWithChildren } from "react";

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <html lang="en">
    <body>
      <article>{children}</article>
    </body>
  </html>
);

export default Layout;
