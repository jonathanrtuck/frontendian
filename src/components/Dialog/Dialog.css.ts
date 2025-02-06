import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { globalStyle, styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    ":focus": {
      outline: 0,
    },
    borderColor: `${vars.border.color.light} ${vars.border.color.dark} ${vars.border.color.dark} ${vars.border.color.light}`,
    borderWidth: vars.border.width,
    boxShadow: vars.box.shadow.high,
    color: vars.text.color.dark,
    left: "50%",
    margin: "0",
    maxHeight: "calc(100dvh - 2rem)",
    maxWidth: "calc(100dvw - 2rem)",
    overflow: "auto",
    padding: vars.border.width,
    position: "fixed",
    top: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
  },
  "theme-mac-os-classic": {},
});

export const content = styleVariants<StylesByTheme>({
  "theme-beos": {
    backgroundImage: `linear-gradient(to right, ${vars.background.color.dark} 3rem, ${vars.background.color.default} 3rem)`,
    borderColor: `${vars.border.color.dark} ${vars.color.highlight} ${vars.color.highlight} ${vars.border.color.dark}`,
    borderWidth: vars.border.width,
    boxShadow: `inset 0 0 0 ${vars.border.width} ${vars.border.color.light}`,
    fontSize: "0.875rem",
    padding: "1rem 1rem 1rem 6rem",
  },
  "theme-mac-os-classic": {},
});

globalStyle(`.${content["theme-beos"]} > *:first-child`, {
  marginTop: 0,
});
globalStyle(`.${content["theme-beos"]} > *:last-child`, {
  marginBottom: 0,
});
globalStyle(`.${content["theme-beos"]} :is(dl, ol, p, ul)`, {
  margin: "0.5rem 0",
});
globalStyle(`.${content["theme-beos"]} :is(footer)`, {
  display: "flex",
  gap: "0.5rem",
  justifyContent: "flex-end",
  margin: "1.5rem 0 0",
});
globalStyle(`.${content["theme-beos"]} :is(h1, h2, h3, h4, h5, h6)`, {
  margin: "1rem 0 0.5rem",
});

export const icon = styleVariants<StylesByTheme>({
  "theme-beos": {
    height: "3rem",
    left: "2rem",
    position: "absolute",
    top: "1rem",
    width: "3rem",
  },
  "theme-mac-os-classic": {},
});
