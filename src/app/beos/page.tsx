"use client";

import "./page.css";
import { Clock, Selection } from "./_components";
import * as files from "@/files";
import {
  BeOS,
  Error,
  File,
  Info,
  Network,
  Pdf,
  Text,
  WindowHidden,
  WindowVisible,
} from "@/icons";
import { SYSTEM_BAR_ID } from "@/ids";
import { useStore } from "@/store";
import { type IconComponent, type MimeType } from "@/types";
import clsx from "clsx";
import localFont from "next/font/local";
import { type FunctionComponent, useRef } from "react";

const FONT_COURIER_10_PITCH = localFont({
  src: "./_fonts/Courier10Pitch.otf",
  variable: "--font-courier-10-pitch",
});
const ICONS: Partial<Record<MimeType, IconComponent>> = {
  "application/pdf": Pdf,
  "text/markdown": Text,
};

const Page: FunctionComponent = () => {
  const blurWindow = useStore((store) => store.blurWindow);
  const closeApplication = useStore((store) => store.closeApplication);
  const closeDialog = useStore((store) => store.closeDialog);
  const closeWindow = useStore((store) => store.closeWindow);
  const dialogs = useStore((store) => store.dialogs);
  const focusSystemBar = useStore((store) => store.focusSystemBar);
  const focusWindow = useStore((store) => store.focusWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const moveTitlebar = useStore((store) => store.moveTitlebar);
  const moveWindow = useStore((store) => store.moveWindow);
  const openApplication = useStore((store) => store.openApplication);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const openDialog = useStore((store) => store.openDialog);
  const openFile = useStore((store) => store.openFile);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const showWindow = useStore((store) => store.showWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const windows = useStore((store) => store.windows);
  const zoomWindow = useStore((store) => store.zoomWindow);
  const gridRef = useRef<HTMLDivElement>(null);

  return (
    <main className="bg-[rgb(51,102,152)] cursor-default h-screen w-screen">
      <div
        className="fixed gap-x-4 gap-y-8 grid grid-cols-[repeat(auto-fill,6.75rem)] grid-rows-[repeat(auto-fill,4.75rem)] inset-0 items-start mr-44 overflow-hidden p-4 text-white"
        ref={gridRef}>
        {Object.values(files).map(({ id, mimetype, title }) => {
          const Icon = ICONS[mimetype] ?? File;

          return (
            <button
              className="flex flex-col gap-1 group items-center justify-center p-1 rounded-lg"
              key={id}
              onDoubleClick={() => openFile({ id })}
              onKeyDown={({ key }) =>
                key === "Enter" || key === " " ? openFile({ id }) : undefined
              }
              tabIndex={0}
              title={title}
              type="button">
              <Icon className="aspect-square group-focus:brightness-60 w-12" />
              <span className="group-focus:bg-black leading-4 max-w-full text-sm truncate">
                {title}
              </span>
            </button>
          );
        })}
        <Selection
          aria-hidden
          className="absolute bg-transparent border border-dotted"
          ref={gridRef}
        />
      </div>
      <header
        aria-label="Deskbar"
        className="bg-[rgb(222,222,222)] border border-dark fixed flex flex-col inset-shadow-high max-h-dvh right-0 top-0 w-44"
        id={SYSTEM_BAR_ID}
        role="banner"
        style={{ zIndex: stackingOrder.indexOf(SYSTEM_BAR_ID) }}
        tabIndex={-1}>
        <aside className="bg-black/17.5 bg-clip-padding border border-transparent flex gap-1 inset-shadow-low items-center justify-between m-px px-2 py-1 shadow-high">
          <menu className="flex gap-1">
            <li className="flex-none h-4 w-4">
              <Network />
            </li>
          </menu>
          <Clock className="font-medium -mr-1 px-1 select-none text-[0.8125rem]" />
        </aside>
      </header>
    </main>
  );
};

export default Page;
