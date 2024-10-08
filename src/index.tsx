import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { UI } from "@/components/UI";
import { IS_DEBUG_MODE } from "@/constants";

import "./index.css";

if (IS_DEBUG_MODE) {
  // eslint-disable-next-line no-console
  const reportHandler = console.debug;

  import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportHandler);
    getFID(reportHandler);
    getFCP(reportHandler);
    getLCP(reportHandler);
    getTTFB(reportHandler);
  });
}

createRoot(document.body).render(
  <StrictMode>
    <UI />
  </StrictMode>
);
