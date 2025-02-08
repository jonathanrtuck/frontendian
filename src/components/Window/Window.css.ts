import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    ":focus": {
      outline: 0,
    },
    color: vars.text.color.dark,
    margin: `calc(${vars.components.window.padding} + ${vars.components.window.header.height} + ${vars.components.window.padding}) 0 0`,
    padding: 0,
    position: "fixed",
  },
  "theme-mac-os-classic": {},
});

export const frame = styleVariants<StylesByTheme>({
  "theme-beos": {
    "::before": {
      backgroundColor: vars.background.color.inactive,
      borderColor: `${vars.border.color.light} ${vars.border.color.dark} ${vars.border.color.dark} ${vars.border.color.light}`,
      borderWidth: vars.border.width,
      boxShadow: vars.box.shadow.high,
      content: "''",
      inset: `calc(${vars.components.window.padding} - ${vars.border.width})`,
      position: "absolute",
      zIndex: -1,
    },
    borderColor: `${vars.color.lowlight} ${vars.color.highlight} ${vars.color.highlight} ${vars.color.lowlight}`,
    borderWidth: vars.border.width,
    boxShadow: `inset 0 0 0 ${vars.border.width} ${vars.border.color.light}`,
    margin: vars.components.window.padding,
    padding: vars.border.width,
    position: "relative",
    selectors: {
      '[aria-current="true"] &::before': {
        backgroundColor: vars.background.color.default,
      },
    },
  },
  "theme-mac-os-classic": {},
});
