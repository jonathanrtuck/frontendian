import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    backgroundColor: "rgb(255, 255, 255)",
    color: vars.text.color.dark,
    overflow: "hidden",
    padding: 0,
  },
  "theme-mac-os-classic": {},
});

export const overflowHorizontal = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const overflowVertical = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const scrollable = styleVariants<StylesByTheme>({
  "theme-beos": {
    overflow: "scroll",
  },
  "theme-mac-os-classic": {},
});

export const resize = styleVariants<StylesByTheme>({
  "theme-beos": {
    backgroundColor: vars.background.color.inactive,
    borderColor: vars.color.highlight,
    borderWidth: `${vars.border.width} 0 0 ${vars.border.width}`,
    bottom: `calc(${vars.border.width} * -1)`,
    boxShadow: `calc(${vars.border.width} * -1) calc(${vars.border.width} * -1) ${vars.border.color.light}`,
    color: "rgba(0, 0, 0, 0.2)",
    height: `calc(${vars.scrollbar.width} + ${vars.border.width})`,
    padding: vars.border.width,
    position: "absolute",
    right: `calc(${vars.border.width} * -1)`,
    width: `calc(${vars.scrollbar.width} + ${vars.border.width})`,
    zIndex: 3,
  },
  "theme-mac-os-classic": {},
});
