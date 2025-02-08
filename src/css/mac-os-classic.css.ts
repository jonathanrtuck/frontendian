import { FONT_CHARCOAL } from "@/fonts";
import { THEME_MAC_OS_CLASSIC } from "@/themes";
import { createGlobalTheme } from "@vanilla-extract/css";
import { vars } from "./vars.css";

const borderWidth = "0.0625rem";
const colorHighlight = "rgba(255, 255, 255, 0.6)";
const colorLowlight = "rgba(0, 0, 0, 0.4)";
const textColorDark = "rgb(0, 0, 0)";

export default createGlobalTheme(`.${THEME_MAC_OS_CLASSIC.id}`, vars, {
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
        `inset calc(${borderWidth} * -1) calc(${borderWidth} * -1) ${colorLowlight}`,
      ].join(),
      low: [
        `inset ${borderWidth} ${borderWidth} ${colorLowlight}`,
        `inset calc(${borderWidth} * -1) calc(${borderWidth} * -1) ${colorHighlight}`,
      ].join(),
    },
  },
  color: {
    highlight: colorHighlight,
    lowlight: colorLowlight,
  },
  components: {
    systemBar: {
      height: "1.5rem",
      width: "auto",
    },
    window: {
      header: {
        height: "1rem",
      },
      padding: "0.25rem",
    },
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
    width: "1rem",
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
