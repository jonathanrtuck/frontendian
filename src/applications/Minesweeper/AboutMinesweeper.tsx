"use client";

import type { FunctionComponent } from "react";

export const AboutMinesweeper: FunctionComponent = () => (
  <>
    <p>
      Recreation of{" "}
      <a href="https://en.wikipedia.org/wiki/Minesweeper_(video_game)">
        Minesweeper
      </a>
      .
    </p>
    <p>
      Difficulty can be selected from the <b>Game</b> menu.
    </p>
    <h4>Notes</h4>
    <p>Custom boards not yet supported.</p>
  </>
);

AboutMinesweeper.displayName = "AboutMinesweeper";
