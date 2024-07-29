import { ApplicationConfiguration } from "@/types";

import { DEFAULT_LEVEL, DEFAULT_STATE } from "./constants";
import { Minesweeper } from "./Minesweeper";
import { MinesweeperIcon } from "./MinesweeperIcon";

export const APPLICATION_MINESWEEPER: ApplicationConfiguration = {
  Component: Minesweeper,
  getWindow: () => ({
    height: DEFAULT_STATE[DEFAULT_LEVEL].height,
    title: "Minesweeper",
    width: DEFAULT_STATE[DEFAULT_LEVEL].width,
  }),
  Icon: MinesweeperIcon,
  id: "application-minesweeper",
  title: "Minesweeper",
};
