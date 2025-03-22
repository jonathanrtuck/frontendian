"use client";

import "./page.css";
import * as applications from "@/applications";
import { Clock, Menu, Menuitem, Selection } from "@/components";
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
  src: "./Courier10Pitch.otf",
  variable: "--font-courier-10-pitch",
});
const ICONS: Partial<Record<MimeType, IconComponent>> = {
  "application/pdf": Pdf,
  "text/markdown": Text,
};
const MENUITEM_CLASSNAME =
  "aria-expanded:bg-neutral-400 hover:bg-neutral-400 flex font-medium gap-2 items-center px-2 py-1 select-none text-sm/4 w-full";

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
        className="bg-default border border-dark fixed flex flex-col inset-shadow-high max-h-dvh right-0 top-0 w-44"
        id={SYSTEM_BAR_ID}
        role="banner"
        style={{ zIndex: stackingOrder.indexOf(SYSTEM_BAR_ID) }}
        tabIndex={-1}>
        <Menuitem
          Icon={BeOS}
          aria-label="BeOS Menu"
          classes={{
            button:
              "aria-expanded:bg-neutral-400 flex not-aria-expanded:inset-shadow-high items-center justify-center p-[0.125rem] w-full",
            icon: "h-6",
          }}
          standalone>
          <Menu className="bg-default border border-dark inset-auto inset-shadow-high max-w-80 min-w-20 right-[anchor(left)] top-[anchor(top)] z-100">
            <Menuitem
              className={MENUITEM_CLASSNAME}
              onClick={() => openFile({ id: files.FILE_README_MD.id })}
              title={files.FILE_README_MD.title}
            />
            <Menuitem className={MENUITEM_CLASSNAME} title="Theme">
              <Menu>…</Menu>
            </Menuitem>
            <Menuitem
              className="border-b-(--color-highlight) border-t-(--color-lowlight) border-y my-1 mx-[0.125rem]"
              role="separator"
            />
            <Menuitem
              className={MENUITEM_CLASSNAME}
              onClick={() => {
                useStore.persist.clearStorage();
                window.location.reload();
              }}
              title="Restart"
            />
            <Menuitem
              className="border-b-(--color-highlight) border-t-(--color-lowlight) border-y my-1 mx-[0.125rem]"
              role="separator"
            />
            {Object.values(applications)
              .filter(
                ({ id }) => id !== applications.APPLICATION_FILE_MANAGER.id
              )
              .map(({ Icon, id, title }) => (
                <Menuitem
                  Icon={Icon}
                  className={MENUITEM_CLASSNAME}
                  classes={{ icon: "flex-none h-4 w-4" }}
                  key={id}
                  onClick={() => openApplication({ id })}
                  title={title("beos")}
                />
              ))}
          </Menu>
        </Menuitem>
        <aside className="bg-black/17.5 bg-clip-padding border border-transparent flex gap-1 inset-shadow-low items-center justify-between m-px px-2 py-1 shadow-high">
          <menu className="flex gap-1">
            <li className="flex-none h-4 w-4">
              <Network />
            </li>
          </menu>
          <Clock className="font-medium -mr-1 px-1 select-none text-[0.8125rem]/4" />
        </aside>
        <menu
          aria-orientation="horizontal"
          className="flex flex-col"
          role="menubar">
          {openApplicationIds
            .map(
              (openApplicationId) =>
                Object.values(applications).find(
                  ({ id }) => id === openApplicationId
                )!
            )
            .map(({ Icon, id, title }) => (
              <li key={id} onBlur={undefined} role="none">
                <button
                  aria-expanded={false}
                  aria-haspopup="menu"
                  aria-label={title("beos")}
                  className="flex font-medium gap-2 inset-shadow-high items-center px-2 py-1 select-none text-sm/4 w-full"
                  onClick={undefined}
                  onKeyDown={undefined}
                  onMouseEnter={undefined}
                  onPointerDown={undefined}
                  role="menuitem"
                  tabIndex={undefined}
                  type="button">
                  <Icon className="flex-none h-4 w-4" />
                  <span className="">{title("beos")}</span>
                </button>
              </li>
            ))}
        </menu>
      </header>
    </main>
  );
};

export default Page;
