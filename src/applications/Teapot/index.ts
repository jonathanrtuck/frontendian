import type { Application } from "@/types";
import { Teapot } from "./Teapot";
import { TeapotIcon } from "./TeapotIcon";

export const APPLICATION_TEAPOT: Application = {
  Component: Teapot,
  getWindow: () => ({
    height: 300,
    title: "Teapot",
    width: 300,
  }),
  Icon: TeapotIcon,
  id: "application-teapot",
  mimetypes: [],
  title: "Teapot",
};
