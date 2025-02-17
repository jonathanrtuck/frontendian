import { BeOS, MacOSClassic } from "./icons";
import { Teapot } from "./Teapot";
import type { Application, Theme } from "@/types";

export const APPLICATION_TEAPOT: Application = {
  Component: Teapot,
  getWindow: () => ({
    height: 300,
    title: "Teapot",
    width: 300,
  }),
  Icon: (theme: Theme) => {
    switch (theme) {
      case "beos":
        return BeOS;
      case "mac-os-classic":
        return MacOSClassic;
    }
  },
  id: "application-teapot",
  mimetypes: [],
  title: () => "Teapot",
};
