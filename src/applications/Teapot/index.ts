import { ApplicationConfiguration } from "@/types";
import { Teapot } from "./Teapot";
import { TeapotIcon } from "./TeapotIcon";

export const APPLICATION_TEAPOT: ApplicationConfiguration = {
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
