import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    backgroundColor: vars.background.color.default,
    borderWidth: vars.border.width,
    boxShadow: vars.box.shadow.high,
    color: vars.text.color.dark,
    display: "flex",
    flexDirection: "column",
    maxHeight: "100dvh",
    position: "fixed",
    right: 0,
    top: 0,
    width: vars.components.systemBar.width,
  },
  "theme-mac-os-classic": {},
});
