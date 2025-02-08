import { createGlobalThemeContract } from "@vanilla-extract/css";

export const vars = createGlobalThemeContract({
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
  components: {
    systemBar: {
      height: "components-system-bar-height",
      width: "components-system-bar-width",
    },
    window: {
      header: {
        height: "components-window-header-height",
      },
      padding: "components-window-padding",
    },
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
    width: "scrollbar-width",
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
