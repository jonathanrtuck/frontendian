import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    "::before": {
      backgroundColor: "rgba(0, 0, 0, 0.175)",
      boxShadow: vars.box.shadow.low,
      content: "''",
      inset: `calc(${vars.border.width} * 2)`,
      position: "absolute",
      zIndex: "-1",
    },
    alignItems: "center",
    boxShadow: vars.box.shadow.high,
    display: "flex",
    gap: "0.25rem",
    justifyContent: "space-between",
    padding: `calc(${vars.border.width} * 2 + 0.25rem) calc(${vars.border.width} * 2 + 0.5rem)`,
    position: "relative",
  },
  "theme-mac-os-classic": {},
});

export const icons = styleVariants<StylesByTheme>({
  "theme-beos": {
    display: "flex",
    gap: "0.25rem",
    listStyle: "none",
    margin: 0,
    padding: 0,
  },
  "theme-mac-os-classic": {},
});

export const icon = styleVariants<StylesByTheme>({
  "theme-beos": {
    flex: "0 0 1rem",
    height: "1rem",
    width: "1rem",
  },
  "theme-mac-os-classic": {},
});

export const button = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});
