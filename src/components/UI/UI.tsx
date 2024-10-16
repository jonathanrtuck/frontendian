import { FunctionComponent, useEffect, useMemo } from "react";
import { Helmet, HelmetProps } from "react-helmet";

import {
  Deskbar,
  Desktop,
  Dialog,
  ErrorBoundary,
  Menubar,
  Window,
} from "@/components";
import { FILE_README_MD } from "@/files";
import { openFile, useStore } from "@/store";

export const UI: FunctionComponent = () => {
  const files = useStore((state) => state.files);
  const fonts = useStore((state) => state.fonts);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  const htmlAttributes = useMemo<HelmetProps["htmlAttributes"]>(
    () =>
      Object.entries(theme.components).reduce(
        (acc, [component, obj]) => {
          Object.entries(obj).forEach(([key, value]) => {
            if (acc) {
              acc[`data-theme-${component}-${key}`] = String(value);
            }
          });

          return acc;
        },
        {
          "data-theme-id": theme.id,
        } as HelmetProps["htmlAttributes"]
      ),
    [theme]
  );
  const style = useMemo<HelmetProps["style"]>(
    () =>
      fonts.map(({ format, title, url }) => ({
        cssText: `@font-face { font-family: "${title}"; src: url("${url}") format("${format}") }`,
      })),
    [fonts]
  );

  useEffect(() => {
    openFile({ id: FILE_README_MD.id });
  }, []);

  return (
    <>
      <Helmet htmlAttributes={htmlAttributes} style={style}>
        {files.map(({ id, url }) => (
          <link href={url} key={id} rel="preconnect" />
        ))}
        {fonts.map(({ id, url }) => (
          <link as="font" crossOrigin="" href={url} key={id} rel="preload" />
        ))}
      </Helmet>
      <ErrorBoundary
        fallback={
          <Dialog>
            <p>An unknown error has occured.</p>
            <p>Please reload the page.</p>
          </Dialog>
        }>
        <Desktop />
        {!theme.components.deskbar.hidden && <Deskbar />}
        {!theme.components.menubar.windowed && <Menubar />}
        {windows.map((window) => (
          <Window key={window.id} {...window} />
        ))}
      </ErrorBoundary>
    </>
  );
};

UI.displayName = "UI";
