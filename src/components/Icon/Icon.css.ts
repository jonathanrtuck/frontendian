import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {
    ":focus": {
      outline: 0,
    },
    alignItems: "center",
    borderRadius: "0.5rem",
    display: "flex",
    flexDirection: "column",
    fontFamily: "inherit",
    gap: "0.25rem",
    maxHeight: "100%",
    width: "100%",
  },
  "theme-mac-os-classic": {},
});

export const icon = styleVariants<StylesByTheme>({
  "theme-beos": {
    aspectRatio: "1 / 1",
    margin: "0 25%",
    width: "50%",
  },
  "theme-mac-os-classic": {},
});

export const title = styleVariants<StylesByTheme>({
  "theme-beos": {
    fontSize: "0.875rem",
    fontWeight: 400,
    maxWidth: "100%",
    overflow: "hidden",
    selectors: {
      [`.${root["theme-beos"]}:focus &`]: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
      },
    },
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  "theme-mac-os-classic": {},
});
