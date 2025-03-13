"use client";

import * as applications from "@/applications";
import {
  Grid,
  Icon,
  Menu,
  Menuitem,
  SystemBar,
  Tray,
  TrayIcon,
  TrayIcons,
} from "@/components";
import * as files from "@/files";
import {
  Applications,
  File,
  Network,
  Pdf,
  Restart,
  Settings,
  Text,
  Windows as Logo,
} from "@/icons";
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
  const openApplication = useStore((store) => store.openApplication);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const openFile = useStore((store) => store.openFile);
  const windows = useStore((store) => store.windows);

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
      <SystemBar title="">
        <Menu bar horizontal>
          <Menuitem Icon={Logo} title="Start">
            <Menu>
              <Menuitem
                Icon={Text}
                onClick={() => openFile({ id: files.FILE_README_MD.id })}
                title={files.FILE_README_MD.title}
              />
              <Menuitem separator />
              <Menuitem Icon={Applications} title="Programs">
                <Menu>
                  {Object.values(applications)
                    .filter(
                      ({ id }) =>
                        id !== applications.APPLICATION_FILE_MANAGER.id
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
              <Menuitem Icon={Settings} title="Theme">
                <Menu>
                  <Menuitem href="beos" title="BeOS" type="radio" />
                  <Menuitem
                    href="mac-os-classic"
                    title="Mac OS Classic"
                    type="radio"
                  />
                  <Menuitem
                    checked
                    href="windows-95"
                    title="Windows 95"
                    type="radio"
                  />
                </Menu>
              </Menuitem>
              <Menuitem separator />
              <Menuitem
                Icon={Restart}
                onClick={() =>
                  setTimeout(() => {
                    useStore.persist.clearStorage();
                    window.location.reload();
                  }, 0)
                }
                title="Restart"
              />
            </Menu>
          </Menuitem>
        </Menu>
        <Menu bar horizontal>
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
                <Menuitem Icon={Icon} key={id} title={title("windows-95")}>
                  <Menu></Menu>
                </Menuitem>
              );
            })}
        </Menu>
        <Tray>
          <TrayIcons>
            <TrayIcon Icon={Network} />
          </TrayIcons>
          <Clock />
        </Tray>
      </SystemBar>
    </>
  );
};
