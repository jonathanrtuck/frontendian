import { forwardRef } from "react";

import { useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

export const Teapot = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ onClose }) => {
  useMenubar([
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
  ]);

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
