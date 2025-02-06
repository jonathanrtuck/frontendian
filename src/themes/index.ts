import { Apple, BeOS } from "@/icons";
import type { Theme } from "@/types";
import "./beos.css";
import "./mac-os-classic.css";

export const THEME_BEOS: Theme = {
  Icon: BeOS,
  id: "theme-beos",
  title: "BeOS",
};

export const THEME_MAC_OS_CLASSIC: Theme = {
  Icon: Apple,
  id: "theme-mac-os-classic",
  title: "Mac OS Classic",
};
