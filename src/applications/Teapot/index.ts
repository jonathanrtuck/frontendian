import type { Application } from "@/types";
import { Teapot } from "./Teapot";
import { TeapotIcon } from "./TeapotIcon";

export const APPLICATION_TEAPOT: Application = {
  Component: Teapot,
  getTitle: () => "Teapot",
  getWindow: () => ({
    height: 300,
    scrollable: false,
    title: "Teapot",
    width: 300,
  }),
  Icon: TeapotIcon,
  id: "application-teapot",
};
