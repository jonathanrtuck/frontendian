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
import {
  BeOS as Logo,
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
import dynamic from "next/dynamic";
import { type FunctionComponent } from "react";

// @see https://nextjs.org/docs/messages/react-hydration-error
const Clock = dynamic(
  () => import("@/components/Clock").then(({ Clock }) => Clock),
  { ssr: false }
);

const ICONS: Partial<Record<MimeType, IconComponent>> = {
  "application/pdf": Pdf,
  "text/markdown": Text,
};

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
  const openDialog = useStore((store) => store.openDialog);
  const openFile = useStore((store) => store.openFile);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const showWindow = useStore((store) => store.showWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const windows = useStore((store) => store.windows);
  const zoomWindow = useStore((store) => store.zoomWindow);

  return (
    <>
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
          <Menuitem Icon={Logo} title="BeOS Menu">
            <Menu>
              <Menuitem
                onClick={() => openFile({ id: files.FILE_README_MD.id })}
                title={files.FILE_README_MD.title}
              />
              <Menuitem title="Theme">
                <Menu>
                  <Menuitem checked href="beos" title="BeOS" type="radio" />
                  <Menuitem
                    href="mac-os-classic"
                    title="Mac OS Classic"
                    type="radio"
                  />
                </Menu>
              </Menuitem>
              <Menuitem separator />
              <Menuitem
                onClick={() =>
                  setTimeout(() => {
                    useStore.persist.clearStorage();
                    window.location.reload();
                  }, 0)
                }
                title="Restart"
              />
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
                    title={title("beos")}
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
                <Menuitem Icon={Icon} key={id} title={title("beos")}>
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
                          onClick={() => closeApplication({ id })}
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
              applicationId={applicationId}
              current={focused}
              hasMenubar
              height={height}
              hidden={hidden}
              id={id}
              key={id}
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
                onDoubleClick={() => hideWindow({ id })}
                onDrag={(left) => moveTitlebar({ id, left })}>
                <TitleBarButton
                  onClick={() => closeWindow({ id })}
                  title="Close"
                />
                <Title text={title} />
                {resizable ? (
                  <TitleBarButton
                    onClick={() => zoomWindow({ id })}
                    title="Zoom"
                  />
                ) : null}
              </TitleBar>
              <ErrorBoundary
                onError={() =>
                  openDialog({
                    id: applicationId,
                    type: "error",
                  })
                }>
                <application.Component fileId={fileId} windowId={id} />
              </ErrorBoundary>
            </Window>
          );
        }
      )}
      {dialogs.map(({ applicationId, id, type }) => {
        const application = Object.values(applications).find(
          ({ id }) => id === applicationId
        )!;

        switch (type) {
          case "about":
            return (
              <Dialog Icon={Info} id={id} key={id}>
                <h1 className="visually-hidden" id={`${id}--title`}>
                  About {application.title("beos")}
                </h1>
                <application.About />
                <footer>
                  <Button
                    formMethod="dialog"
                    onClick={() => closeDialog({ id })}
                    type="reset">
                    Close
                  </Button>
                </footer>
              </Dialog>
            );
          case "error":
            return (
              <Dialog Icon={Error} id={id} key={id}>
                <h1 className="visually-hidden" id={`${id}--title`}>
                  Error
                </h1>
                <p>
                  <em>{application.title("beos")}</em> has encountered an
                  unknown error.
                </p>
                <footer>
                  <Button
                    formMethod="dialog"
                    onClick={() => {
                      closeApplication({ id: applicationId });
                      closeDialog({ id });
                    }}
                    type="reset">
                    Close
                  </Button>
                </footer>
              </Dialog>
            );
        }
      })}
    </>
  );
};
