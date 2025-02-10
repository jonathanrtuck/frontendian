"use client";

import "./Tray.theme-beos.css";
import { Network } from "@/icons";
import dynamic from "next/dynamic";
import type { FunctionComponent } from "react";

// @see https://nextjs.org/docs/messages/react-hydration-error
const Clock = dynamic(() => import("../Clock").then(({ Clock }) => Clock), {
  ssr: false,
});

export const Tray: FunctionComponent = () => {
  return (
    <aside className="component-tray">
      <menu>
        <li>
          <Network />
        </li>
      </menu>
      <Clock />
    </aside>
  );
};

Tray.displayName = "Tray";
