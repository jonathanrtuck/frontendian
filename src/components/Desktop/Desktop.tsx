"use client";

import "./Desktop.theme-beos.css";
import "./Desktop.theme-mac-os-classic.css";
import { Dialog, ErrorBoundary, Icon, SystemBar, Window } from "@/components";
import { FILE_README_MD } from "@/files";
import { useSelection } from "@/hooks";
import { useStore } from "@/store";
import type { FunctionComponent } from "react";
import { useEffect, useLayoutEffect } from "react";

export const Desktop: FunctionComponent = () => {
  const applications = useStore((store) => store.applications);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const desktop = useStore((store) => store.desktop);
  const files = useStore((store) => store.files);
  const openApplication = useStore((store) => store.openApplication);
  const openFile = useStore((store) => store.openFile);
  const themes = useStore((store) => store.themes);
  const types = useStore((store) => store.types);
  const windows = useStore((store) => store.windows);
  const selection = useSelection();
  const applicationsAndFiles = [...applications, ...files];
  const icons = desktop.map((id) =>
    applicationsAndFiles.find((obj) => obj.id === id)
  );
  const theme = themes.find(({ id }) => id === currentThemeId)!;

  useLayoutEffect(
    () =>
      Object.values(themes).forEach(({ id }) => {
        document.documentElement.classList.toggle(id, id === currentThemeId);
      }),
    [currentThemeId, themes]
  );
  useEffect(() => openFile({ id: FILE_README_MD.id }), [openFile]);

  return (
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
            Component={"windowIds" in obj ? obj.Icon : types[obj.type]?.Icon}
            key={obj.id}
            onClick={() =>
              "windowIds" in obj
                ? openApplication({ id: obj.id })
                : openFile({ id: obj.id })
            }
            title={obj.getTitle(theme)}
          />
        ) : null
      )}
      {selection.from && selection.to ? (
        <mark
          aria-hidden
          role="presentation"
          style={{
            height: Math.abs(selection.from.y - selection.to.y),
            left: Math.min(selection.from.x, selection.to.x),
            top: Math.min(selection.from.y, selection.to.y),
            width: Math.abs(selection.from.x - selection.to.x),
          }}
        />
      ) : null}
      <SystemBar />
      {windows.map((window) => (
        <Window {...window} key={window.id} />
      ))}
    </ErrorBoundary>
  );
};

Desktop.displayName = "Desktop";
