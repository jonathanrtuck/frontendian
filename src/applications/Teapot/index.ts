import { AboutTeapot } from "./AboutTeapot";
import { Teapot } from "./Teapot";
import { TeapotIcon } from "./TeapotIcon";
import { type Application } from "@/types";

export const APPLICATION_TEAPOT: Application = {
  About: AboutTeapot,
  Component: Teapot,
  getWindow: () => ({
    height: 336,
    title: "Teapot",
    width: 312,
  }),
  Icon: TeapotIcon,
  id: "application-teapot",
  mimetypes: [],
  title: () => "Teapot",
};
