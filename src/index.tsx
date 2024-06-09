import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "components/App";
import reportWebVitals from "reportWebVitals";

import "./index.css";

const IS_DEBUG_MODE = process.env.NODE_ENV === "development";

// eslint-disable-next-line no-console
reportWebVitals(IS_DEBUG_MODE ? console.debug : undefined);

createRoot(document.body).render(
  <StrictMode>
    <App isDebugMode={IS_DEBUG_MODE} />
  </StrictMode>
);
