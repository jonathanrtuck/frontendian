import * as fonts from "@/fonts";
import vars from "@/vars.css";
import { globalFontFace, globalStyle } from "@vanilla-extract/css";

Object.values(fonts).forEach(({ format, title, url }) => {
  globalFontFace(title, {
    src: `url("${url}") format("${format}")`,
  });
});

globalStyle(":root", {
  backgroundColor: "rgb(0, 0, 0)",
  color: vars.text.color.default,
  cursor: vars.cursor.default,
  fontFamily: vars.font.family.default,
  MozOsxFontSmoothing: "grayscale",
  WebkitFontSmoothing: "antialiased",
});

globalStyle("body", {
  inset: 0,
  margin: 0,
  position: "fixed",
});

globalStyle("*, *::before, *::after", {
  borderColor: vars.border.color.dark,
  borderStyle: "solid",
  borderWidth: 0,
  boxSizing: "border-box",
});

globalStyle("*::selection", {
  backgroundColor: vars.background.color.selection,
  color: vars.text.color.default,
});

globalStyle(":any-link", {
  color: "inherit",
  cursor: vars.cursor.pointer,
  textDecoration: "none",
});

globalStyle("button", {
  appearance: "none",
  background: "none",
  borderWidth: 0,
  color: "inherit",
  cursor: "inherit",
  font: "inherit",
  margin: 0,
  padding: 0,
  userSelect: "none",
});

globalStyle("code, pre", {
  fontFamily: vars.font.family.monospace,
});

globalStyle("label", {
  cursor: "inherit",
});

globalStyle(".visually-hidden", {
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  whiteSpace: "nowrap",
  width: 1,
});
