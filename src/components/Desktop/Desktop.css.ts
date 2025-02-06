import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    alignItems: "start",
    background: "rgb(51, 102, 152)",
    display: "grid",
    gap: "1rem",
    gridTemplateColumns: "repeat(auto-fill, 6rem)",
    inset: 0,
    justifyItems: "center",
    padding: `1rem calc(${vars.components.systemBar.width} + 1rem) 1rem 1rem`,
    position: "fixed",
  },
  "theme-mac-os-classic": {},
});

export const selection = styleVariants<StylesByTheme>({
  "theme-beos": {
    background: "rgba(128, 187, 255, 0.2)",
    borderColor: "rgba(0, 0, 204, 0.5)",
    borderWidth: vars.border.width,
    position: "absolute",
  },
  "theme-mac-os-classic": {},
});
