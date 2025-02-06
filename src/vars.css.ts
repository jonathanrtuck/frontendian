import { createThemeContract } from "@vanilla-extract/css";

export default createThemeContract({
  background: {
    color: {
      dark: "background-color--dark",
      default: "background-color--default",
      inactive: "background-color--inactive",
      selection: "color--selection",
    },
  },
  border: {
    color: {
      dark: "border-color--dark",
      light: "border-color--light",
    },
    radius: "border-radius",
    width: "border-width",
  },
  box: {
    shadow: {
      high: "box-shadow--high",
      low: "box-shadow--low",
    },
  },
  color: {
    highlight: "color--highlight",
    lowlight: "color--lowlight",
  },
  cursor: {
    default: "cursor--default",
    pointer: "cursor--pointer",
    text: "cursor--text",
  },
  font: {
    family: {
      default: "font-family--default",
      monospace: "font-family--monospace",
    },
  },
  scrollbar: {
    size: "scrollbar-size",
  },
  text: {
    color: {
      dark: "text-color--dark",
      default: "text-color--default",
      disabled: "text-color--disabled",
      light: "text-color--light",
    },
  },
});
