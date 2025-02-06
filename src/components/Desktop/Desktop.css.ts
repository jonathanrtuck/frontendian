import { recipe } from "@vanilla-extract/recipes";
import type { StylesByTheme } from "@/types";

export const root = recipe<StylesByTheme>({
  base: {
    backgroundColor: "red",
  },
  variants: {
    theme: {
      "theme-beos": {
        backgroundColor: "blue",
      },
      "theme-mac-os-classic": {
        backgroundColor: "green",
      },
    },
  },
});
