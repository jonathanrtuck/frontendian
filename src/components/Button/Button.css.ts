import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    ":focus": {
      outline: 0,
    },
    backgroundColor: vars.background.color.inactive,
    borderColor: vars.border.color.dark,
    borderRadius: "0.125rem",
    borderWidth: vars.border.width,
    boxShadow: `inset 0 0 0 ${vars.border.width} ${vars.background.color.dark}`,
    fontSize: "0.75rem",
    minWidth: "4rem",
    padding: "0.25rem",
  },
  "theme-mac-os-classic": {},
});

export const content = styleVariants<StylesByTheme>({
  "theme-beos": {
    backgroundColor: vars.background.color.inactive,
    borderColor: vars.border.color.dark,
    borderRadius: "0.125rem",
    borderWidth: vars.border.width,
    boxShadow: vars.box.shadow.high,
    display: "block",
    padding: "0.125rem 1rem",
    selectors: {
      [`.${root["theme-beos"]}:active &`]: {
        backgroundColor: vars.border.color.dark,
        color: vars.text.color.light,
      },
    },
  },
  "theme-mac-os-classic": {},
});
