import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Ui } from "components/Ui";
import { IsDebugModeContext } from "contexts";
import reportWebVitals from "reportWebVitals";

import "./index.css";

const IS_DEBUG_MODE = process.env.NODE_ENV === "development";

// eslint-disable-next-line no-console
reportWebVitals(IS_DEBUG_MODE ? console.debug : undefined);

createRoot(document.body).render(
  <StrictMode>
    <IsDebugModeContext.Provider value={IS_DEBUG_MODE}>
      <Ui />
    </IsDebugModeContext.Provider>
  </StrictMode>
);
