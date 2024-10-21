import { FunctionComponent, useEffect } from "react";
import { Helmet } from "react-helmet";

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
import { ComponentName } from "@/types";
import { getUrl } from "@/utils";

const COMPONENT_NAME: ComponentName = "UI";

export const UI: FunctionComponent = () => {
  const files = useStore((state) => state.files);
  const fonts = useStore((state) => state.fonts);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  useEffect(() => {
    openFile({ id: FILE_README_MD.id });
  }, []);

  return (
    <>
      <Helmet
        style={fonts.map((font) => ({
          cssText: `@font-face { font-family: "${font.title}"; src: url("${font.url}") format("${font.format}") }`,
        }))}>
        <html className={theme.id} />
        {files.map((file) => (
          <link href={getUrl(file)} key={file.id} rel="preconnect" />
        ))}
        {fonts.map((font) => (
          <link
            as="font"
            crossOrigin=""
            href={font.url}
            key={font.id}
            rel="preload"
          />
        ))}
      </Helmet>
      <ErrorBoundary
        fallback={
          <Dialog modal open type="error">
            <p>An unknown error has occured.</p>
            <p>Please reload the page.</p>
          </Dialog>
        }>
        <Desktop />
        <SystemBar />
        {windows.map((window) => (
          <Window key={window.id} {...window} />
        ))}
      </ErrorBoundary>
    </>
  );
};

UI.displayName = COMPONENT_NAME;
