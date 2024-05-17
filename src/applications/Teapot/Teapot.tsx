import { forwardRef, useContext, useMemo } from "react";

import { StateContext } from "contexts";
import { Menubaritem, useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

export const Teapot = forwardRef<
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
      {
        items: [],
        title: "Settings",
      },
      {
        items: [
          {
            title: "One",
          },
          {
            onClick: () => {},
            title: "A Long Titled Menubaritem",
          },
        ],
        title: "Lights",
      },
    ],
    [application.id, dispatch]
  );

  useMenubar(menubaritems);

  return (
    <div
      style={{
        backgroundColor: "black",
        color: "white",
        height: "100%",
        padding: "1rem",
      }}>
      <p>this will be a 3d rotating teapot…</p>
    </div>
  );
});
