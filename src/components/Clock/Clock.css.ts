import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    fontSize: "0.8125rem",
    fontWeight: 500,
    marginRight: "-0.25rem",
    padding: "0 0.25rem",
    userSelect: "none",
  },
  "theme-mac-os-classic": {},
});
