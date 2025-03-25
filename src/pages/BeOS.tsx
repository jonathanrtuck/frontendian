import * as applications from "@/applications";
import {
  Clock,
  Grid,
  IconButton,
  Menu,
  MenuButton,
  Menubar,
  Menuitem,
  Separator,
  SystemBar,
  Title,
  TitleBar,
  TitleBarButton,
  Tray,
  Window,
} from "@/components";
import * as files from "@/files";
import { FileBeOS, LogoBeOS } from "@/icons";
import { SYSTEM_BAR_ID } from "@/ids";
import { useStore } from "@/store";
import type { IconComponent, MimeType } from "@/types";
import type { FunctionComponent } from "react";

const ICONS: Partial<Record<MimeType, IconComponent>> = {};

export const BeOS: FunctionComponent = () => {
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
      <link href="/themes/mac-os-classic/styles.css" rel="stylesheet" />
      <Grid>
        {Object.values(files).map(({ id, mimetype, title }) => (
          <IconButton
            Icon={ICONS[mimetype] ?? FileBeOS}
            key={id}
            onDoubleClick={() => openFile({ id })}
            title={title}
          />
        ))}
      </Grid>
      <SystemBar
        aria-label="Deskbar"
        style={{ zIndex: stackingOrder.indexOf(SYSTEM_BAR_ID) }}
      >
        <MenuButton Icon={LogoBeOS} aria-label="BeOS Menu">
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
                ({ id }) => id !== applications.APPLICATION_FILE_MANAGER.id,
              )
              .map(({ Icon, id, title }) => (
                <Menuitem
                  Icon={Icon("beos")}
                  key={id}
                  onClick={() => openApplication({ id })}
                  title={title("beos")}
                />
              ))}
          </Menu>
        </MenuButton>
        <Tray>
          <menu>
            <li>…</li>
          </menu>
          <Clock />
        </Tray>
        <Menubar>
          {openApplicationIds
            .map((openApplicationId) =>
              Object.values(applications).find(
                ({ id }) => id === openApplicationId,
              ),
            )
            .filter((application) => application !== undefined)
            .map(({ Icon, id, title }) => {
              const applicationWindows = windows.filter(
                ({ applicationId }) => applicationId === id,
              );

              return (
                <Menuitem
                  Icon={Icon("beos")}
                  key={id}
                  onClick={undefined}
                  title={title("beos")}
                >
                  <Menu>
                    {applicationWindows.length === 0 ? (
                      <Menuitem disabled title="No windows" />
                    ) : (
                      <>
                        {applicationWindows.map(({ hidden, id, title }) => (
                          <Menuitem
                            // Icon={hidden ? WindowHidden : WindowVisible}
                            key={id}
                            onClick={() => focusWindow({ id })}
                            title={title}
                          />
                        ))}
                        <Separator />
                        <Menuitem
                          disabled={applicationWindows.every(
                            ({ hidden }) => hidden,
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
                            ({ hidden }) => !hidden,
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
      {windows.map(
        ({ focused, height, hidden, id, resizable, title, width, x, y }) => (
          <Window
            current={focused}
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
            z={stackingOrder.indexOf(id)}
          >
            <TitleBar
              onDoubleClick={() => hideWindow({ id })}
              onDrag={(left) => moveTitlebar({ id, left })}
            >
              <TitleBarButton
                onClick={() => closeWindow({ id })}
                title="Close"
              />
              <Title>{title}</Title>
              {resizable ? (
                <TitleBarButton
                  onClick={() => zoomWindow({ id })}
                  title="Zoom"
                />
              ) : null}
            </TitleBar>
            window…
          </Window>
        ),
      )}
    </>
  );
};
