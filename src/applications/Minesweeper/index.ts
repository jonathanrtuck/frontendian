import { AboutMinesweeper } from "./AboutMinesweeper";
import { Minesweeper } from "./Minesweeper";
import { MinesweeperIcon } from "./MinesweeperIcon";
import type { Application } from "@/types";

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
