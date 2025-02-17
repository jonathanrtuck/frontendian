"use client";

import { BeOS, File, Network, Pdf, Text } from "./_icons";
import * as applications from "@/applications";
import {
  Dialog,
  ErrorBoundary,
  Grid,
  Icon,
  Menu,
  Menuitem,
  Scrollable,
  SystemBar,
  Title,
  TitleBar,
  TitleBarButton,
  Tray,
  TrayIcons,
  Window,
} from "@/components";
import * as files from "@/files";
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
  const closeWindow = useStore((store) => store.closeWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const moveWindow = useStore((store) => store.moveWindow);
  const moveWindowTitlebar = useStore((store) => store.moveWindowTitlebar);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const openFile = useStore((store) => store.openFile);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const windows = useStore((store) => store.windows);
  const zoomWindow = useStore((store) => store.zoomWindow);

  return (
    <ErrorBoundary
      fallback={
        <Dialog modal open type="error">
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
      <SystemBar>
        <Menu bar>
          <Menuitem Icon={BeOS} title="BeOS">
            <Menu>…</Menu>
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
              const Icon = application.Icon(THEME);
              const title = application.title(THEME);
              const applicationWindows = windows.filter(
                ({ applicationId }) => applicationId === application.id
              );

              return (
                <Menuitem Icon={Icon} key={application.id} title={title}>
                  <Menu>
                    {applicationWindows.length === 0 ? (
                      <Menuitem disabled title="No Windows" />
                    ) : (
                      <></>
                    )}
                  </Menu>
                </Menuitem>
              );
            })}
        </Menu>
      </SystemBar>
      {windows.map(
        ({ collapsed, focused, height, hidden, id, title, width, x, y }) => (
          <Window
            collapsed={collapsed}
            current={focused}
            height={height}
            hidden={hidden}
            id={id}
            key={id}
            labelledby={`${id}-title`}
            onBlur={() => {
              // @todo
            }}
            onDrag={(coordinates) => moveWindow({ id, ...coordinates })}
            onFocus={() => {
              // @todo
            }}
            onResize={(size) => resizeWindow({ id, ...size })}
            width={width}
            x={x}
            y={y}
            z={stackingOrder.indexOf(id)}>
            <TitleBar
              onDoubleClick={() => hideWindow({ id })}
              onDrag={(coordinates) =>
                moveWindowTitlebar({ id, ...coordinates })
              }>
              <TitleBarButton
                onClick={() => closeWindow({ id })}
                title="Close"
              />
              <Title id={`${id}-title`} title={title}>
                {title}
              </Title>
              <TitleBarButton onClick={() => zoomWindow({ id })} title="Zoom" />
            </TitleBar>
            <Menu bar horizontal></Menu>
            <Scrollable>content…</Scrollable>
          </Window>
        )
      )}
    </ErrorBoundary>
  );
};
