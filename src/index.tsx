import { BeOS, MacOSClassic } from "@/pages";
import type { Theme } from "@/types";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Navigate, RouterProvider, createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    element: <Navigate to="/beos" />,
    index: true,
    path: "/",
  },
  {
    element: <BeOS />,
    handle: "beos" as Theme,
    path: "/beos",
  },
  {
    element: <MacOSClassic />,
    handle: "mac-os-classic" as Theme,
    path: "/mac-os-classic",
  },
]);

createRoot(document.body).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
