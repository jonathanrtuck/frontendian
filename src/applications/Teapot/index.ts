import type { Application } from "@/types";
import { AboutTeapot } from "./AboutTeapot";
import { Teapot } from "./Teapot";
import { ReactComponent as TeapotBeOS } from "./teapot-beos.svg";
import { ReactComponent as TeapotMacOSClassic } from "./teapot-mac-os-classic.svg";

export const APPLICATION_TEAPOT: Application = {
  About: AboutTeapot,
  Component: Teapot,
  getWindow: () => ({
    height: 336,
    title: "Teapot",
    width: 312,
  }),
  Icon: (theme) => {
    switch (theme) {
      case "beos":
        return TeapotBeOS;
      case "mac-os-classic":
        return TeapotMacOSClassic;
    }
  },
  id: "application-teapot",
  mimetypes: [],
  title: () => "Teapot",
};
