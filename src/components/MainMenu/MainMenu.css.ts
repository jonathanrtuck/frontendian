import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const menuitem = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const button = styleVariants<StylesByTheme>({
  "theme-beos": {
    selectors: {
      [`.${root["theme-beos"]} .${menuitem["theme-beos"]} &`]: {
        padding: "0.125rem 0",
      },
    },
  },
  "theme-mac-os-classic": {},
});

export const icon = styleVariants<StylesByTheme>({
  "theme-beos": {
    selectors: {
      [`.${root["theme-beos"]} .${menuitem["theme-beos"]} &`]: {
        flex: "1 1 8rem",
        height: "1.75rem",
        width: "unset",
      },
    },
  },
  "theme-mac-os-classic": {},
});
