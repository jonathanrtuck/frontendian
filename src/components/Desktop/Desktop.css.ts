import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    backgroundColor: "blue",
  },
  "theme-mac-os-classic": {
    backgroundColor: "green",
  },
});
