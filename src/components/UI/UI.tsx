import { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Dialog } from "@/components/Dialog";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { FILE_README_MD } from "@/files";
import { openFile, useStore } from "@/store";

import { Deskbar } from "./components/Deskbar";
import { Desktop } from "./components/Desktop";
import { Window } from "./components/Window";

export const UI: FunctionComponent = () => {
  const files = useStore((state) => state.files);
  const fonts = useStore((state) => state.fonts);
  const windows = useStore((state) => state.windows);

  useEffect(() => {
    openFile({ id: FILE_README_MD.id });
  }, []);

  return (
    <>
      <Helmet
        style={fonts.map(({ format, title, url }) => ({
          cssText: `@font-face { font-family: "${title}"; src: url("${url}") format("${format}") }`,
        }))}>
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
        <Deskbar />
        {windows.map((window) => (
          <Window key={window.id} {...window} />
        ))}
      </ErrorBoundary>
    </>
  );
};

UI.displayName = "UI";
