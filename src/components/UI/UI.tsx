import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";

import { Dialog } from "@/components/Dialog";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CLASSNAME_PREFIX } from "@/constants";
import { FILE_README_MD } from "@/files";
import { openFile, useStore } from "@/store";

import { Deskbar } from "./components/Deskbar";
import { Desktop } from "./components/Desktop";
import { Menubar } from "./components/Menubar";
import { Window } from "./components/Window";

const cache = createCache({ key: CLASSNAME_PREFIX });

export const UI: FunctionComponent = () => {
  const files = useStore((state) => state.files);
  const fonts = useStore((state) => state.fonts);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  useEffect(() => {
    openFile({ id: FILE_README_MD.id });
  }, []);

  return (
    <CacheProvider value={cache}>
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
        {!theme.deskbar.hidden && <Deskbar />}
        {!theme.menubar.windowed && <Menubar />}
        {windows.map((window) => (
          <Window key={window.id} {...window} />
        ))}
      </ErrorBoundary>
    </CacheProvider>
  );
};

UI.displayName = "UI";
