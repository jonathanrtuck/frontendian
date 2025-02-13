"use client";

import "./Desktop.theme-beos.css";
import "./Desktop.theme-mac-os-classic.css";
import * as applications from "@/applications";
import { Dialog, ErrorBoundary, Icon, SystemBar, Window } from "@/components";
import { ThemeIdContext } from "@/contexts";
import * as files from "@/files";
import { useSelection } from "@/hooks";
import { MIMETYPES } from "@/mimetypes";
import { useStore } from "@/store";
import * as themes from "@/themes";
import type { Application, File } from "@/types";
import type { FunctionComponent } from "react";
import { useEffect, useLayoutEffect } from "react";

export const Desktop: FunctionComponent = () => {
  const desktop = useStore((store) => store.desktop);
  const openApplication = useStore((store) => store.openApplication);
  const openFile = useStore((store) => store.openFile);
  const themeId = useStore((store) => store.themeId);
  const windows = useStore((store) => store.windows);
  const selection = useSelection();
  const applicationsAndFiles: (Application | File)[] = [
    ...Object.values(applications),
    ...Object.values(files),
  ];
  const icons = desktop.map((id) =>
    applicationsAndFiles.find((obj) => obj.id === id)
  );
  const selectionStyle =
    selection.from && selection.to
      ? {
          height: Math.abs(selection.from.y - selection.to.y),
          left: Math.min(selection.from.x, selection.to.x),
          top: Math.min(selection.from.y, selection.to.y),
          width: Math.abs(selection.from.x - selection.to.x),
        }
      : undefined;

  useLayoutEffect(
    () =>
      Object.values(themes).forEach(({ id }) => {
        document.documentElement.classList.toggle(id, id === themeId);
      }),
    [themeId]
  );
  useEffect(() => openFile({ id: files.FILE_README_MD.id }), [openFile]);

  return (
    <ThemeIdContext.Provider value={themeId}>
      <ErrorBoundary
        fallback={
          <Dialog modal open type="error">
            <p>An unknown error has occured.</p>
            <p>Please reload the page.</p>
          </Dialog>
        }>
        {icons.map((obj) =>
          obj ? (
            <Icon
              Component={
                "mimetype" in obj ? MIMETYPES[obj.mimetype]?.Icon : obj.Icon
              }
              key={obj.id}
              onClick={() =>
                "mimetype" in obj
                  ? openFile({ id: obj.id })
                  : openApplication({ id: obj.id })
              }
              title={obj.getTitle({ themeId })}
            />
          ) : null
        )}
        {selectionStyle ? (
          <mark aria-hidden role="presentation" style={selectionStyle} />
        ) : null}
        <SystemBar />
        {windows.map((window) => (
          <Window {...window} key={window.id} />
        ))}
      </ErrorBoundary>
    </ThemeIdContext.Provider>
  );
};

Desktop.displayName = "Desktop";
