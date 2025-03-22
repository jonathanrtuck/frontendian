"use client";

import "./page.css";
import * as applications from "@/applications";
import {
  Clock,
  Grid,
  Icon,
  Menu,
  Menubar,
  MenuButton,
  Menuitem,
  Separator,
  SystemBar,
  Tray,
} from "@/components";
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
import localFont from "next/font/local";
import { type FunctionComponent } from "react";

const FONT_COURIER_10_PITCH = localFont({
  src: "./Courier10Pitch.otf",
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

  return (
    <main className="bg-[rgb(51,102,152)] cursor-default h-screen w-screen">
      <Grid>
        {Object.values(files).map(({ id, mimetype, title }) => (
          <Icon
            Icon={ICONS[mimetype] ?? File}
            key={id}
            onDoubleClick={() => openFile({ id })}
            title={title}
          />
        ))}
      </Grid>
      <SystemBar
        aria-label="Deskbar"
        style={{ zIndex: stackingOrder.indexOf(SYSTEM_BAR_ID) }}>
        <MenuButton
          Icon={BeOS}
          aria-label="BeOS Menu"
          className="justify-center p-[0.125rem]">
          <Menu>
            <Menuitem
              onClick={() => openFile({ id: files.FILE_README_MD.id })}
              title={files.FILE_README_MD.title}
            />
            <Menuitem title="Theme">
              <Menu>…</Menu>
            </Menuitem>
            <Separator />
            <Menuitem
              onClick={() => {
                useStore.persist.clearStorage();
                window.location.reload();
              }}
              title="Restart"
            />
            <Separator />
            {Object.values(applications)
              .filter(
                ({ id }) => id !== applications.APPLICATION_FILE_MANAGER.id
              )
              .map(({ Icon, id, title }) => (
                <Menuitem
                  Icon={Icon}
                  key={id}
                  onClick={() => openApplication({ id })}
                  title={title("beos")}
                />
              ))}
          </Menu>
        </MenuButton>
        <Tray>
          <menu className="flex gap-1">
            <li className="flex-none h-4 w-4">
              <Network aria-label="Network" />
            </li>
          </menu>
          <Clock />
        </Tray>
        <Menubar className="flex flex-col">
          {openApplicationIds
            .map(
              (openApplicationId) =>
                Object.values(applications).find(
                  ({ id }) => id === openApplicationId
                )!
            )
            .map(({ Icon, id, title }) => {
              const applicationWindows = windows.filter(
                ({ applicationId }) => applicationId === id
              );

              return (
                <Menuitem
                  Icon={Icon}
                  key={id}
                  onClick={undefined}
                  title={title("beos")}>
                  <Menu>
                    {applicationWindows.length === 0 ? (
                      <Menuitem disabled title="No windows" />
                    ) : (
                      <>
                        {applicationWindows.map(({ hidden, id, title }) => (
                          <Menuitem
                            Icon={hidden ? WindowHidden : WindowVisible}
                            key={id}
                            onClick={() => focusWindow({ id })}
                            title={title}
                          />
                        ))}
                        <Separator />
                        <Menuitem
                          disabled={applicationWindows.every(
                            ({ hidden }) => hidden
                          )}
                          onClick={() =>
                            applicationWindows
                              .map(({ id }) => ({ id }))
                              .forEach(hideWindow)
                          }
                          title="Hide all"
                        />
                        <Menuitem
                          disabled={applicationWindows.every(
                            ({ hidden }) => !hidden
                          )}
                          onClick={() =>
                            applicationWindows
                              .map(({ id }) => ({ id }))
                              .forEach(showWindow)
                          }
                          title="Show all"
                        />
                        <Menuitem
                          onClick={() => closeApplication({ id })}
                          title="Close all"
                        />
                      </>
                    )}
                  </Menu>
                </Menuitem>
              );
            })}
        </Menubar>
      </SystemBar>
    </main>
  );
};

export default Page;
