import { vars } from "@/css";
import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const overflowHorizontal = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const overflowVertical = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const scrollable = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});
