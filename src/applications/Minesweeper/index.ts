import type { Application } from "@/types";
import { AboutMinesweeper } from "./AboutMinesweeper";
import { Minesweeper } from "./Minesweeper";
import { ReactComponent as MinesweeperBeOS } from "./minesweeper-beos.svg";
import { ReactComponent as MinesweeperMacOSClassic } from "./minesweeper-mac-os-classic.svg";

export const APPLICATION_MINESWEEPER: Application = {
  About: AboutMinesweeper,
  Component: Minesweeper,
  getWindow: () => ({
    height: "auto",
    resizable: false,
    title: "Minesweeper",
    width: "auto",
  }),
  Icon: (theme) => {
    switch (theme) {
      case "beos":
        return MinesweeperBeOS;
      case "mac-os-classic":
        return MinesweeperMacOSClassic;
    }
  },
  id: "application-minesweeper",
  mimetypes: [],
  title: () => "Minesweeper",
};
