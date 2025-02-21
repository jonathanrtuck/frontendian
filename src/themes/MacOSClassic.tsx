"use client";

import * as applications from "@/applications";
import {
  Button,
  Dialog,
  ErrorBoundary,
  Grid,
  Icon,
  Menu,
  Menuitem,
  SystemBar,
  Title,
  TitleBar,
  TitleBarButton,
  Tray,
  TrayIcons,
  Window,
} from "@/components";
import * as files from "@/files";
import { Apple as Logo, Error, File, Pdf } from "@/icons";
import { SYSTEM_BAR_ID } from "@/ids";
import { useStore } from "@/store";
import type { IconComponent, MimeType, Theme } from "@/types";
import dynamic from "next/dynamic";
import type { FunctionComponent } from "react";

// @see https://nextjs.org/docs/messages/react-hydration-error
const Clock = dynamic(
  () => import("@/components/Clock").then(({ Clock }) => Clock),
  { ssr: false }
);

const ICONS: Partial<Record<MimeType, IconComponent>> = {
  "application/pdf": Pdf,
  "text/markdown": Pdf, // @todo
};

export const MacOSClassic: FunctionComponent = () => {
  const blurWindow = useStore((store) => store.blurWindow);
  const closeApplication = useStore((store) => store.closeApplication);
  const closeWindow = useStore((store) => store.closeWindow);
  const focusSystemBar = useStore((store) => store.focusSystemBar);
  const focusWindow = useStore((store) => store.focusWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const moveTitlebar = useStore((store) => store.moveTitlebar);
  const moveWindow = useStore((store) => store.moveWindow);
  const openApplication = useStore((store) => store.openApplication);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const openFile = useStore((store) => store.openFile);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const showWindow = useStore((store) => store.showWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const windows = useStore((store) => store.windows);
  const zoomWindow = useStore((store) => store.zoomWindow);

  return (
    <>
      <link href="/themes/mac-os-classic/styles.css" rel="stylesheet" />
      <ErrorBoundary
        fallback={
          <Dialog id="dialog-error">
            <TitleBar className="visually-hidden">
              <Title text="Error" />
            </TitleBar>
            <Error />
            <p>An unknown error has occured.</p>
            <p>Please reload the page.</p>
          </Dialog>
        }>
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
        <SystemBar title="Menubar">
          <Menu bar>
            <Menuitem Icon={Logo} title="Apple Menu">
              <Menu>
                <Menuitem
                  onClick={() => openFile({ id: files.FILE_README_MD.id })}
                  title={files.FILE_README_MD.title}
                />
                <Menuitem separator />
                <Menuitem title="Theme">
                  <Menu>
                    <Menuitem href="beos" title="BeOS" type="radio" />
                    <Menuitem
                      checked
                      href="mac-os-classic"
                      title="Mac OS Classic"
                      type="radio"
                    />
                  </Menu>
                </Menuitem>
                <Menuitem separator />
                {Object.values(applications)
                  .filter(
                    ({ id }) => id !== applications.APPLICATION_FILE_MANAGER.id
                  )
                  .map(({ Icon, id, title }) => (
                    <Menuitem
                      Icon={Icon}
                      key={id}
                      onClick={() => openApplication({ id })}
                      title={title("mac-os-classic")}
                    />
                  ))}
              </Menu>
            </Menuitem>
          </Menu>
        </SystemBar>
        {windows.map(({ id, title }) => (
          <h1 key={id}>{title}</h1>
        ))}
      </ErrorBoundary>
    </>
  );
};

MacOSClassic.displayName = "MacOSClassic";
