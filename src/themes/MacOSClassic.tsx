"use client";

import * as applications from "@/applications";
import {
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
  Window,
} from "@/components";
import * as files from "@/files";
import { Apple as Logo, Error, File, Pdf } from "@/icons";
import { MENU_BAR_ID } from "@/ids";
import { useStore } from "@/store";
import type { IconComponent, MimeType } from "@/types";
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
  const closeWindow = useStore((store) => store.closeWindow);
  const collapseWindow = useStore((store) => store.collapseWindow);
  const expandWindow = useStore((store) => store.expandWindow);
  const focusWindow = useStore((store) => store.focusWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const moveWindow = useStore((store) => store.moveWindow);
  const openApplication = useStore((store) => store.openApplication);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const openFile = useStore((store) => store.openFile);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const showWindow = useStore((store) => store.showWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const windows = useStore((store) => store.windows);
  const zoomWindow = useStore((store) => store.zoomWindow);
  const focusedWindow = windows.find(({ focused }) => focused);
  const activeApplication = focusedWindow
    ? Object.values(applications).find(
        ({ id }) => id === focusedWindow.applicationId
      )!
    : applications.APPLICATION_FILE_MANAGER;
  const activeApplicationWindows = windows.filter(
    ({ applicationId }) => applicationId === activeApplication.id
  );
  const otherApplicationWindows = windows.filter(
    ({ applicationId }) => applicationId !== activeApplication.id
  );

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
        <SystemBar
          onBlur={(windowId) =>
            !windowId && focusedWindow
              ? blurWindow({ id: focusedWindow.id })
              : undefined
          }
          title="Menubar">
          <Menu bar horizontal id={MENU_BAR_ID}>
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
          <Clock />
          <Menu bar collapsible horizontal>
            <Menuitem
              Icon={activeApplication.Icon}
              title={activeApplication.title("mac-os-classic")}>
              <Menu>
                <Menuitem
                  disabled={
                    activeApplicationWindows.length === 0 ||
                    activeApplicationWindows.every(({ hidden }) => hidden)
                  }
                  onClick={() =>
                    activeApplicationWindows.forEach(({ hidden, id }) =>
                      !hidden ? hideWindow({ id }) : undefined
                    )
                  }
                  title={`Hide ${activeApplication.title("mac-os-classic")}`}
                />
                <Menuitem
                  disabled={
                    openApplicationIds.length < 2 ||
                    otherApplicationWindows.every(({ hidden }) => hidden)
                  }
                  onClick={() =>
                    otherApplicationWindows.forEach(({ hidden, id }) =>
                      !hidden ? hideWindow({ id }) : undefined
                    )
                  }
                  title="Hide Others"
                />
                <Menuitem
                  disabled={windows.every(({ hidden }) => !hidden)}
                  onClick={() =>
                    windows.forEach(({ hidden, id }) =>
                      hidden ? showWindow({ id }) : undefined
                    )
                  }
                  title="Show all"
                />
                <Menuitem separator />
                {openApplicationIds.map((applicationId) => {
                  const application = Object.values(applications).find(
                    ({ id }) => id === applicationId
                  )!;
                  const firstApplicationWindow = windows.find(
                    ({ applicationId }) => applicationId === application.id
                  );

                  return (
                    <Menuitem
                      Icon={application.Icon}
                      checked={applicationId === activeApplication.id}
                      key={applicationId}
                      onClick={() => {
                        if (firstApplicationWindow) {
                          focusWindow({ id: firstApplicationWindow.id });
                        } else if (focusedWindow) {
                          blurWindow({ id: focusedWindow.id });
                        }
                      }}
                      title={application.title("mac-os-classic")}
                      type="radio"
                    />
                  );
                })}
              </Menu>
            </Menuitem>
          </Menu>
        </SystemBar>
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
        {windows.map(
          ({
            applicationId,
            collapsed,
            focused,
            height,
            hidden,
            id,
            resizable,
            title,
            width,
            x,
            y,
            ...window
          }) => {
            const { Component, Icon } = Object.values(applications).find(
              ({ id }) => id === applicationId
            )!;
            const fileId = "fileId" in window ? window.fileId : undefined;
            const file = fileId
              ? Object.values(files).find(({ id }) => id === fileId)
              : undefined;
            const TitleBarIcon = file ? ICONS[file.mimetype] ?? File : Icon;

            return (
              <Window
                collapsed={collapsed}
                current={focused}
                height={collapsed ? "auto" : height}
                hidden={hidden}
                id={id}
                key={id}
                onBlur={() => blurWindow({ id })}
                onDrag={(coordinates) => moveWindow({ id, ...coordinates })}
                onFocus={() => focusWindow({ id })}
                onResize={
                  resizable && !collapsed
                    ? (size) => resizeWindow({ id, ...size })
                    : undefined
                }
                width={width}
                x={x}
                y={y}
                z={stackingOrder.indexOf(id)}>
                <TitleBar
                  onDoubleClick={() =>
                    collapsed ? expandWindow({ id }) : collapseWindow({ id })
                  }>
                  <TitleBarButton
                    onClick={() => closeWindow({ id })}
                    title="Close"
                  />
                  <TitleBarIcon />
                  <Title text={title} />
                  {resizable ? (
                    <TitleBarButton
                      onClick={() => zoomWindow({ id })}
                      title="Zoom"
                    />
                  ) : null}
                  <TitleBarButton
                    onClick={() =>
                      collapsed ? expandWindow({ id }) : collapseWindow({ id })
                    }
                    title={collapsed ? "Expand" : "Collapse"}
                  />
                </TitleBar>
                <ErrorBoundary fallback={null}>
                  <Component fileId={fileId} windowId={id} />
                </ErrorBoundary>
              </Window>
            );
          }
        )}
      </ErrorBoundary>
    </>
  );
};

MacOSClassic.displayName = "MacOSClassic";
