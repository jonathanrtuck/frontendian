import { DEFAULT_LEVEL, DEFAULT_STATE } from "./constants";
import { Minesweeper } from "./Minesweeper";
import { MinesweeperIcon } from "./MinesweeperIcon";
import type { Application } from "@/types";

export const APPLICATION_MINESWEEPER: Application = {
  Component: Minesweeper,
  getWindow: () => ({
    height: DEFAULT_STATE[DEFAULT_LEVEL].height,
    resizable: false,
    title: "Minesweeper",
    width: DEFAULT_STATE[DEFAULT_LEVEL].width,
  }),
  Icon: MinesweeperIcon,
  id: "application-minesweeper",
  mimetypes: [],
  title: () => "Minesweeper",
};
