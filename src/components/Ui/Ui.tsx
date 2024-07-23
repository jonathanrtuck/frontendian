import { FunctionComponent } from "react";

import { Deskbar } from "./components/Deskbar";
import { Desktop } from "./components/Desktop";
import { Windows } from "./components/Windows";
import { Dialog } from "components/Dialog";
import { ErrorBoundary } from "components/ErrorBoundary";

export const Ui: FunctionComponent = () => (
  <ErrorBoundary
    fallback={
      <Dialog text="An unknown error has occured. Please reload the page." />
    }>
    <Desktop />
    <Deskbar />
    <Windows />
  </ErrorBoundary>
);
