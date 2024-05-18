import { forwardRef, useContext, useMemo } from "react";

import { StateContext } from "contexts";
import { Menubaritem, useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

export const Minesweeper = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ application }, ref) => {
  const [, dispatch] = useContext(StateContext);

  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: () => {
              dispatch({
                payload: {
                  ids: [application.id],
                  type: "application",
                },
                type: "CLOSE",
              });
            },
            title: "Quit",
          },
        ],
        title: "File",
      },
    ],
    [application.id, dispatch]
  );

  useMenubar(menubaritems);

  return <h1>minesweeper…</h1>;
});
