import type { StylesByTheme } from "@/types";
import { styleVariants } from "@vanilla-extract/css";

export const root = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const menuitem = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});

export const menu = styleVariants<StylesByTheme>({
  "theme-beos": {},
  "theme-mac-os-classic": {},
});
