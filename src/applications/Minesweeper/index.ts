import { APPLICATION_ID, DEFAULT_LEVEL, DEFAULT_STATE } from "./constants";
import { BeOS, MacOSClassic } from "./icons";
import { Minesweeper } from "./Minesweeper";
import type { Application, Theme } from "@/types";

export const APPLICATION_MINESWEEPER: Application = {
  Component: Minesweeper,
  getWindow: () => ({
    height: DEFAULT_STATE[DEFAULT_LEVEL].height,
    resizable: false,
    title: "Minesweeper",
    width: DEFAULT_STATE[DEFAULT_LEVEL].width,
  }),
  Icon: (theme: Theme) => {
    switch (theme) {
      case "beos":
        return BeOS;
      case "mac-os-classic":
        return MacOSClassic;
    }
  },
  id: APPLICATION_ID,
  mimetypes: [],
  title: () => "Minesweeper",
};
