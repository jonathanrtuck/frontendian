import { FONT_CHARCOAL } from "@/fonts";
import vars from "@/vars.css";
import { createGlobalTheme } from "@vanilla-extract/css";

const borderWidth = "0.0625rem";
const colorHighlight = "rgba(255, 255, 255, 0.6)";
const colorLowlight = "rgba(0, 0, 0, 0.4)";
const textColorDark = "rgb(0, 0, 0)";

export default createGlobalTheme(".theme-mac-os-classic", vars, {
  background: {
    color: {
      dark: "transparent",
      default: "rgb(204, 204, 204)",
      inactive: "rgb(220, 220, 220)",
      selection: "rgb(204, 204, 253)",
    },
  },
  border: {
    color: {
      dark: "rgb(38, 38, 38)",
      light: "transparent",
    },
    radius: "0.75rem",
    width: borderWidth,
  },
  box: {
    shadow: {
      high: [
        `inset ${borderWidth} ${borderWidth} ${colorHighlight}`,
        `inset -${borderWidth} -${borderWidth} ${colorLowlight}`,
      ].join(),
      low: [
        `inset ${borderWidth} ${borderWidth} ${colorLowlight}`,
        `inset -${borderWidth} -${borderWidth} ${colorHighlight}`,
      ].join(),
    },
  },
  color: {
    highlight: colorHighlight,
    lowlight: colorLowlight,
  },
  cursor: {
    default: "default",
    pointer: "pointer",
    text: "text",
  },
  font: {
    family: {
      default: FONT_CHARCOAL.title,
      monospace: [
        "ui-monospace",
        "Menlo",
        "Monaco",
        "Cascadia Mono",
        "Segoe UI Mono",
        "Roboto Mono",
        "Oxygen Mono",
        "Ubuntu Monospace",
        "Source Code Pro",
        "Fira Mono",
        "Droid Sans Mono",
        "Courier New",
        "monospace",
      ].join(),
    },
  },
  scrollbar: {
    size: "1rem",
  },
  text: {
    color: {
      dark: textColorDark,
      default: textColorDark,
      disabled: "rgb(160, 160, 160)",
      light: "rgb(255, 255, 255)",
    },
  },
});
