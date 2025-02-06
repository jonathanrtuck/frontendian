import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const bar = styleVariants<StylesByTheme>({
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

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    display: "flex",
    listStyle: "none",
    margin: 0,
    padding: 0,
    selectors: {
      [`&.${horizontal["theme-beos"]}`]: {
        flexDirection: "row",
        height: "1.5rem",
      },
      [`&.${horizontal["theme-beos"]}.${bar["theme-beos"]}`]: {
        boxShadow: vars.box.shadow.high,
      },
      [`&.${horizontal["theme-beos"]} &`]: {
        left: 0,
        top: "100%",
      },
      [`&.${vertical["theme-beos"]}`]: {
        flexDirection: "column",
      },
      [`&.${vertical["theme-beos"]} &`]: {
        right: `calc(100% - ${vars.border.width})`,
        top: 0,
      },
      [`&:not(.${bar["theme-beos"]})`]: {
        backgroundColor: vars.background.color.default,
        borderWidth: vars.border.width,
        boxShadow: vars.box.shadow.high,
        color: vars.text.color.dark,
        flexDirection: "column",
        maxWidth: "20rem",
        minWidth: "5rem",
        position: "absolute",
        zIndex: 100,
      },
      [`&:not(${bar["theme-beos"]}) &`]: {
        left: "100%",
        right: "unset",
        top: 0,
      },
    },
  },
  "theme-mac-os-classic": {},
});
