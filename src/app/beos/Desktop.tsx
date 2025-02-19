"use client";

import {
  BeOS,
  File,
  Info,
  Network,
  Pdf,
  Text,
  WindowHidden,
  WindowVisible,
} from "./_icons";
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
  "text/markdown": Text,
};
const THEME: Theme = "beos";

export const Desktop: FunctionComponent = () => {
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
  const openFile = useStore((store) => store.openFile);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const showWindow = useStore((store) => store.showWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const windows = useStore((store) => store.windows);
  const zoomWindow = useStore((store) => store.zoomWindow);

  return (
    <ErrorBoundary
      fallback={
        <Dialog open>
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
      <SystemBar
        onFocus={focusSystemBar}
        title="Deskbar"
        z={stackingOrder.indexOf(SYSTEM_BAR_ID)}>
        <Menu bar>
          <Menuitem Icon={BeOS} title="BeOS">
            <Menu>
              <Menuitem
                onClick={() => openFile({ id: files.FILE_README_MD.id })}
                title={files.FILE_README_MD.title}
              />
              <Menuitem separator />
              {/*
              <Menuitem title="Theme">
                <Menu>
                  {Object.values(themes).map(({ id, title }) => (
                    <Menuitem
                      checked={id === currentThemeId}
                      key={id}
                      onClick={() => setTheme({ id })}
                      title={title}
                      type="radio"
                    />
                  ))}
                </Menu>
              </Menuitem>
              <Menuitem separator />
              */}
              {Object.values(applications)
                .filter(
                  ({ id }) => id !== applications.APPLICATION_FILE_MANAGER.id
                )
                .map((application) => (
                  <Menuitem
                    Icon={application.Icon}
                    key={application.id}
                    onClick={() => openApplication({ id: application.id })}
                    title={application.title(THEME)}
                  />
                ))}
            </Menu>
          </Menuitem>
        </Menu>
        <Tray>
          <TrayIcons>
            <Network />
          </TrayIcons>
          <Clock />
        </Tray>
        <Menu bar>
          {openApplicationIds
            .map(
              (id) =>
                Object.values(applications).find(
                  (application) => application.id === id
                )!
            )
            .map((application) => {
              const title = application.title(THEME);
              const applicationWindows = windows.filter(
                ({ applicationId }) => applicationId === application.id
              );

              return (
                <Menuitem
                  Icon={application.Icon}
                  key={application.id}
                  title={title}>
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
                        <Menuitem separator />
                        <Menuitem
                          disabled={applicationWindows.every(
                            ({ hidden }) => hidden
                          )}
                          onClick={() =>
                            applicationWindows.forEach(({ id }) =>
                              hideWindow({ id })
                            )
                          }
                          title="Hide all"
                        />
                        <Menuitem
                          disabled={applicationWindows.every(
                            ({ hidden }) => !hidden
                          )}
                          onClick={() =>
                            applicationWindows.forEach(({ id }) =>
                              showWindow({ id })
                            )
                          }
                          title="Show all"
                        />
                        <Menuitem
                          onClick={() =>
                            closeApplication({ id: application.id })
                          }
                          title="Close all"
                        />
                      </>
                    )}
                  </Menu>
                </Menuitem>
              );
            })}
        </Menu>
      </SystemBar>
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
          titlebar,
          width,
          x,
          y,
          ...window
        }) => {
          const application = Object.values(applications).find(
            ({ id }) => id === applicationId
          )!;
          const fileId = "fileId" in window ? window.fileId : undefined;

          return (
            <Window
              collapsed={collapsed}
              current={focused}
              height={height}
              hidden={hidden}
              id={id}
              key={id}
              labelledby={`${id}-title`}
              onBlur={() => blurWindow({ id })}
              onDrag={(coordinates) => moveWindow({ id, ...coordinates })}
              onFocus={() => focusWindow({ id })}
              onResize={
                resizable ? (size) => resizeWindow({ id, ...size }) : undefined
              }
              width={width}
              x={x}
              y={y}
              z={stackingOrder.indexOf(id)}>
              <TitleBar
                left={titlebar.left}
                maxWidth={width}
                onDoubleClick={() => hideWindow({ id })}
                onDrag={(left) => moveTitlebar({ id, left })}>
                <TitleBarButton
                  onClick={() => closeWindow({ id })}
                  title="Close"
                />
                <Title id={`${id}-title`} title={title}>
                  {title}
                </Title>
                {resizable ? (
                  <TitleBarButton
                    onClick={() => zoomWindow({ id })}
                    title="Zoom"
                  />
                ) : null}
              </TitleBar>
              <application.Component fileId={fileId} windowId={id} />
            </Window>
          );
        }
      )}
      {dialogs.map(({ Component, id, title }) => (
        <Dialog id={id} key={id} labelledby={`${id}-title`} open>
          <TitleBar className="visually-hidden">
            <Title id={`${id}-title`} title={title}>
              {title}
            </Title>
          </TitleBar>
          <Info />
          <Component />
          <footer>
            <Button
              formMethod="dialog"
              onClick={() => closeDialog({ id })}
              type="reset">
              Close
            </Button>
          </footer>
        </Dialog>
      ))}
    </ErrorBoundary>
  );
};
