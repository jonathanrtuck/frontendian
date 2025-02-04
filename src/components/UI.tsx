import { FunctionComponent, useEffect } from "react";
import { preload } from "react-dom";

import {
  Desktop,
  Dialog,
  ErrorBoundary,
  SystemBar,
  Window,
} from "@/components";
import { FILE_README_MD } from "@/files";
import { useStore } from "@/hooks";
import { openFile } from "@/store";
import * as themes from "@/themes";

export const UI: FunctionComponent = () => {
  const fonts = useStore((state) => state.fonts);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  fonts.forEach(({ url }) => preload(url, { as: "font", crossOrigin: "" }));

  useEffect(() => {
    Object.values(themes).forEach(({ id }) => {
      document.documentElement.classList.toggle(id, id === theme.id);
    });
  }, [theme.id]);

  useEffect(() => {
    openFile({ id: FILE_README_MD.id });
  }, []);

  return (
    <ErrorBoundary
      fallback={
        <Dialog modal open type="error">
          <p>An unknown error has occured.</p>
          <p>Please reload the page.</p>
        </Dialog>
      }>
      {fonts.map(({ format, title, url }) => (
        <style href={url} key={url} precedence="">
          {`@font-face { font-family: "${title}"; src: url("${url}") format("${format}") }`}
        </style>
      ))}
      <Desktop />
      <SystemBar />
      {windows.map((window) => (
        <Window {...window} key={window.id} />
      ))}
    </ErrorBoundary>
  );
};

UI.displayName = "UI";
