"use client";

import * as applications from "@/applications";
import { Menu, Menuitem } from "@/components";
import { WindowContext } from "@/contexts";
import { useTheme } from "@/hooks";
import { MENU_BAR_ID } from "@/ids";
import { useStore } from "@/store";
import type { FunctionComponent, PropsWithChildren } from "react";
import { useContext, useLayoutEffect, useState } from "react";
import { createPortal } from "react-dom";

export const Menubar: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const openDialog = useStore((store) => store.openDialog);
  const { applicationId, current } = useContext(WindowContext);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const theme = useTheme();

  useLayoutEffect(() => setRoot(document.getElementById(MENU_BAR_ID)), [theme]);

  if (root) {
    return current ? createPortal(children, root) : null;
  }

  return (
    <Menu bar horizontal>
      {children}
      {applicationId ? (
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => openDialog({ id: applicationId })}
              title={`About ${Object.values(applications)
                .find(({ id }) => id === applicationId)!
                .title(theme)}…`}
            />
          </Menu>
        </Menuitem>
      ) : null}
    </Menu>
  );
};

Menubar.displayName = "Menubar";
