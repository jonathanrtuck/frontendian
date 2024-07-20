import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Ui } from "components/Ui";
import reportWebVitals from "reportWebVitals";

import "./index.css";

reportWebVitals(
  // eslint-disable-next-line no-console
  process.env.NODE_ENV === "development" ? console.debug : undefined
);

createRoot(document.body).render(
  <StrictMode>
    <Ui />
  </StrictMode>
);
