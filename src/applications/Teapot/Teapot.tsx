import { forwardRef, useMemo } from "react";

import { Menubaritem, useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

export const Teapot = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ onClose }, ref) => {
  const menubaritems = useMemo<Menubaritem[]>(
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
            onClick: onClose,
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
    [onClose]
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
