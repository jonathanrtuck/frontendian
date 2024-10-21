import { ComponentName, CssModule, Theme } from "@/types";

import * as BEOS from "./beos";
import * as MAC_OS_CLASSIC from "./mac-os-classic";

export const STYLES_BY_THEME: Record<
  Theme["id"],
  Record<ComponentName, CssModule>
> = {
  "theme-beos": BEOS,
  "theme-mac-os-classic": MAC_OS_CLASSIC,
};
