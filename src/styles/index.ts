import { Styles, Theme } from "@/types";

import { STYLES_BEOS } from "./beos";
import { STYLES_MAC_OS_CLASSIC } from "./mac-os-classic";

export const STYLES_BY_THEME: Record<Theme["id"], Styles> = {
  "theme-beos": STYLES_BEOS,
  "theme-mac-os-classic": STYLES_MAC_OS_CLASSIC,
};
