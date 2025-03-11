import { type Application, type Size } from "@/types";
import { createContext } from "react";

export const WindowContext = createContext<{
  applicationId?: Application["id"];
  current?: boolean;
  id?: string;
  width?: Size["width"];
}>({});
