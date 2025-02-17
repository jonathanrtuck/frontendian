"use client";

import * as applications from "@/applications";
import { Dialog, ErrorBoundary, TitleBar, Window } from "@/components";
import * as files from "@/files";
import { File } from "@/icons";
import { MIMETYPES } from "@/mimetypes";
import { useStore } from "@/store";
import { THEME_BEOS } from "@/themes";
import type { FunctionComponent } from "react";

export const Windows: FunctionComponent = () => {
  const blurWindow = useStore((store) => store.blurWindow);
  const closeWindow = useStore((store) => store.closeWindow);
  const collapseWindow = useStore((store) => store.collapseWindow);
  const expandWindow = useStore((store) => store.expandWindow);
  const focusWindow = useStore((store) => store.focusWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const moveWindow = useStore((store) => store.moveWindow);
  const resizeWindow = useStore((store) => store.resizeWindow);
  const stackingOrder = useStore((store) => store.stackingOrder);
  const themeId = useStore((store) => store.themeId);
  const windows = useStore((store) => store.windows);
  const zoomWindow = useStore((store) => store.zoomWindow);
  const isDialogModal = themeId === "beos";
  const isDoubleClickable = themeId === "beos";

  return windows.map(
    ({
      applicationId,
      collapsed,
      fileId,
      focused,
      height,
      hidden,
      id,
      resizable,
      width,
      x,
      y,
    }) => {
      const application = Object.values(applications).find(
        ({ id }) => id === applicationId
      )!;
      const file = fileId
        ? Object.values(files).find(({ id }) => id === fileId)
        : undefined;
      const Icon = file
        ? MIMETYPES[file.mimetype]?.Icon ?? File
        : application.Icon;

      return (
        <ErrorBoundary
          fallback={
            <Dialog
              modal={isDialogModal}
              onClose={() => closeWindow({ id })}
              open
              type="error">
              <p>
                {application.getTitle({ themeId })} has encountered an unknown
                error.
              </p>
            </Dialog>
          }
          key={id}>
          <Window
            collapsed={collapsed}
            focused={focused}
            height={height}
            hidden={hidden}
            id={id}
            onBlur={(e) => {
              // @todo
              /*
              if (
                document.hasFocus() &&
                !e.currentTarget?.contains(e.relatedTarget) &&
                (isMenubarWindowed ||
                  !document
                    .getElementById(SYSTEM_BAR_ID)
                    ?.contains(e.relatedTarget))
              ) {
                blurWindow({ id });
              }
              */
            }}
            onDrag={({ x, y }) => moveWindow({ id, x, y })}
            onFocus={(e) => {
              if (
                !focused &&
                (!e.relatedTarget ||
                  !e.currentTarget?.contains(e.relatedTarget))
              ) {
                focusWindow({ id });
              }
            }}
            onResize={
              resizable
                ? ({ height, width }) => resizeWindow({ height, id, width })
                : undefined
            }
            width={width}
            x={x}
            y={y}
            z={stackingOrder.indexOf(id)}>
            <TitleBar
              Icon={Icon}
              onClose={() => closeWindow({ id })}
              onCollapse={!collapsed ? () => collapseWindow({ id }) : undefined}
              onDoubleClick={
                isDoubleClickable ? () => hideWindow({ id }) : undefined
              }
              onExpand={collapsed ? () => expandWindow({ id }) : undefined}
              onZoom={() => zoomWindow({ id })}
              title="titlebar…"
            />
            content…
          </Window>
        </ErrorBoundary>
      );
    }
  );
};

Windows.displayName = "Windows";
