import { forwardRef, useMemo } from "react";

import { Menubaritem } from "components/Menubar";
import { useMenubar } from "components/Windows/components/Window";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

export const Teapot = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, window }, ref) => {
  const menuitems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: () => {},
            title: "New",
          },
          {
            title: "Open…",
          },
          null,
          {
            onClick: () => {},
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
    []
  );

  useMenubar(menuitems);

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
