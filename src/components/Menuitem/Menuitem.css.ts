import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    ":focus": {
      outline: 0,
    },
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  "theme-mac-os-classic": {},
});

export const separator = styleVariants<StylesByTheme>({
  "theme-beos": {
    borderColor: `${vars.color.lowlight} transparent ${vars.color.highlight}`,
    borderWidth: `${vars.border.width} 0`,
    margin: "0.25rem 0.125rem",
  },
  "theme-mac-os-classic": {},
});

export const top = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const horizontal = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const vertical = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const hasPopup = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const pointer = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const button = styleVariants<StylesByTheme>({
  "theme-beos": {
    alignItems: "center",
    display: "flex",
    fontSize: "0.875rem",
    fontWeight: 500,
    gap: "0.5rem",
    lineHeight: 1.2,
    position: "relative",
    selectors: {
      "&[role='menuitemradio']::before": {
        content: "''",
        fontFamily: vars.font.family.default,
        fontSize: "0.625rem",
        width: "0.5rem",
      },
      '&[aria-checked="true"]::before': {
        content: "'✔︎'",
      },
      [`.${horizontal["theme-beos"]} > &`]: {
        height: "100%",
        padding: "0 0.5rem",
      },
      [`.${vertical["theme-beos"]} > &`]: {
        padding: "0.25rem 0.5rem",
        width: "100%",
      },
      [`&.${top["theme-beos"]}.${vertical["theme-beos"]} > &`]: {
        boxShadow: vars.box.shadow.high,
      },
      [`&.${top["theme-beos"]}.${vertical["theme-beos"]} > &[aria-expanded="true"]`]:
        {
          boxShadow: `inset 0 ${vars.border.width} ${vars.border.color.dark}`,
        },
      '&[aria-disabled="true"]': {
        color: vars.text.color.disabled,
      },
      '&[aria-expanded="true"]': {
        backgroundColor: "rgb(160, 160, 160)",
      },
      '&[aria-expanded="true"]::after': {
        color: "rgb(200, 200, 200)",
      },
      [`.${root["theme-beos"]}:not(.${top["theme-beos"]}) > &:not([aria-checked="true"], [aria-disabled="true"]):hover`]:
        {
          backgroundColor: "rgb(160, 160, 160)",
        },
      [`.${root["theme-beos"]}:not(.${top["theme-beos"]}) > &${hasPopup["theme-beos"]}`]:
        {
          paddingRight: "2rem",
        },
      [`.${root["theme-beos"]}:not(.${top["theme-beos"]}) > &:where([aria-haspopup="menu"])::after`]:
        {
          color: "rgb(240, 240, 240)",
          content: "'▶︎'",
          fontSize: "0.75rem",
          position: "absolute",
          right: "0.5rem",
          textShadow: [
            `${vars.border.color.dark} 0 0 ${vars.border.width}`,
            `${vars.border.color.dark} ${vars.border.width} ${vars.border.width} ${vars.border.width}`,
          ].join(),
          transform: "scaleY(0.7)",
        },
      [`.${root["theme-beos"]}:not(.${top["theme-beos"]}) > &[aria-haspopup="menu"]:not([aria-checked="true"], [aria-disabled="true"]):hover::after`]:
        {
          color: "rgb(200, 200, 200)",
        },
    },
    userSelect: "none",
  },
  "theme-mac-os-classic": {},
});

export const icon = styleVariants<StylesByTheme>({
  "theme-beos": {
    flex: "0 0 1rem",
    height: "1rem",
    width: "1rem",
  },
  "theme-mac-os-classic": {},
});

export const title = styleVariants<StylesByTheme>({
  "theme-beos": {
    flex: "1 1 auto",
    overflow: "hidden",
    textAlign: "left",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "theme-mac-os-classic": {},
});
