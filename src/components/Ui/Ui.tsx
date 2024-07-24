import { FunctionComponent } from "react";
import { Helmet } from "react-helmet";

import { Deskbar } from "./components/Deskbar";
import { Desktop } from "./components/Desktop";
import { Windows } from "./components/Windows";
import { Dialog } from "components/Dialog";
import { ErrorBoundary } from "components/ErrorBoundary";
import { useStore } from "store";

export const UI: FunctionComponent = () => {
  const files = useStore((state) => state.files);
  const fonts = useStore((state) => state.fonts);

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
          <Dialog text="An unknown error has occured. Please reload the page." />
        }>
        <Desktop />
        <Deskbar />
        <Windows />
      </ErrorBoundary>
    </>
  );
};
