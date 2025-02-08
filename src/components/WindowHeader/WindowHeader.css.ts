import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

// @todo --window-titlebar-button-background-image

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    "::after": {
      backgroundColor: "var(--window-background-color)",
      bottom: `calc(${vars.border.width} * -2)`,
      content: "''",
      height: vars.border.width,
      left: 0,
      position: "absolute",
      right: 0,
    },
    backgroundColor: "var(--window-background-color)",
    borderColor: `${vars.border.color.light} ${vars.border.color.dark} var(--window-background-color) ${vars.border.color.light}`,
    borderWidth: vars.border.width,
    boxShadow: `inset ${vars.border.width} ${vars.border.width} ${vars.color.highlight}, inset calc(${vars.border.width} * -1) 0 ${vars.color.lowlight}`,
    display: "flex",
    gap: "0.5rem",
    height: `calc(${vars.border.width} + ${vars.components.window.padding} + ${vars.components.window.header.height} + ${vars.components.window.padding} + ${vars.border.width})`,
    left: 0,
    maxWidth: "100%",
    padding: vars.components.window.padding,
    position: "absolute",
    top: `calc((${vars.border.width} + ${vars.components.window.padding} + ${vars.components.window.header.height} + ${vars.components.window.padding}) * -1)`,
    zIndex: 1,
    selectors: {
      '[aria-current="true"] &': {
        backgroundColor: "rgb(240, 202, 68)",
        borderBottomColor: vars.background.color.default,
      },
    },
  },
  "theme-mac-os-classic": {},
});

export const button = styleVariants<StylesByTheme>({
  "theme-beos": {
    ":focus": {
      outline: 0,
    },
    aspectRatio: "1 / 1",
    flex: `0 0 ${vars.components.window.header.height}`,
    position: "relative",
  },
  "theme-mac-os-classic": {},
});

export const icon = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const title = styleVariants<StylesByTheme>({
  "theme-beos": {
    flex: "1 1 auto",
    fontSize: "1rem",
    height: "1.25rem",
    margin: 0,
    order: "2",
    overflow: "hidden",
    padding: "0 0.75rem",
    textOverflow: "ellipsis",
    userSelect: "none",
    whiteSpace: "nowrap",
  },
  "theme-mac-os-classic": {},
});

export const close = styleVariants<StylesByTheme>({
  "theme-beos": {
    backgroundImage: "var(--window-titlebar-button-background-image)",
    borderColor: `${vars.color.lowlight} ${vars.color.highlight} ${vars.color.highlight} ${vars.color.lowlight}`,
    borderWidth: vars.border.width,
    boxShadow: [
      `inset ${vars.border.width} ${vars.border.width} ${vars.color.highlight}`,
      `inset calc(${vars.border.width} * -1) calc(${vars.border.width} * -1) ${vars.color.lowlight}`,
    ].join(),
    order: 1,
    selectors: {
      "&:where(:active, :focus-visible)": {
        backgroundImage: `var(--window-titlebar-button-background-image--active)`,
        boxShadow: [
          `inset ${vars.border.width} ${vars.border.width} ${vars.color.lowlight}`,
          `inset calc(${vars.border.width} * -1) calc(${vars.border.width} * -1) ${vars.color.highlight}`,
        ].join(),
      },
    },
  },
  "theme-mac-os-classic": {},
});

export const zoom = styleVariants<StylesByTheme>({
  "theme-beos": {
    order: 3,
    selectors: {
      "&::before, &::after": {
        backgroundImage: "var(--window-titlebar-button-background-image)",
        borderColor: `${vars.color.lowlight} ${vars.color.highlight} ${vars.color.highlight} ${vars.color.lowlight}`,
        borderWidth: vars.border.width,
        boxShadow: [
          `inset ${vars.border.width} ${vars.border.width} ${vars.color.highlight}`,
          `inset calc(${vars.border.width} * -1) calc(${vars.border.width} * -1) ${vars.color.lowlight}`,
        ].join(),
        content: "''",
        position: "absolute",
      },
      "&::before": {
        height: `calc(${vars.components.window.header.height}  / 1.8)`,
        left: 0,
        top: 0,
        width: `calc(${vars.components.window.header.height}  / 1.8)`,
        zIndex: 2,
      },
      "&::after": {
        bottom: 0,
        height: `calc(${vars.components.window.header.height} / 1.4)`,
        right: 0,
        width: `calc(${vars.components.window.header.height} / 1.4)`,
        zIndex: 1,
      },
      "&:where(:active, :focus-visible)::before, &:where(:active, :focus-visible)::after":
        {
          backgroundImage:
            "var(--window-titlebar-button-background-image--active)",
          boxShadow: [
            `inset ${vars.border.width} ${vars.border.width} ${vars.color.lowlight}`,
            `inset calc(${vars.border.width} * -1) calc(${vars.border.width} * -1) ${vars.color.highlight}`,
          ].join(),
        },
    },
  },
  "theme-mac-os-classic": {},
});

export const collapse = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});
