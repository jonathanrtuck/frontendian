import type { Application } from "@/types";
import { AboutMinesweeper } from "./AboutMinesweeper";
import { Minesweeper } from "./Minesweeper";
import { MinesweeperIcon } from "./MinesweeperIcon";

export const APPLICATION_MINESWEEPER: Application = {
  About: AboutMinesweeper,
  Component: Minesweeper,
  getWindow: () => ({
    height: "auto",
    resizable: false,
    title: "Minesweeper",
    width: "auto",
  }),
  Icon: MinesweeperIcon,
  id: "application-minesweeper",
  mimetypes: [],
  title: () => "Minesweeper",
};
