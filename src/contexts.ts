import type { Size } from "@/types";
import { createContext } from "react";

export const WindowContext = createContext<{
  current: boolean;
  id?: string;
  width: Size["width"];
}>({
  current: false,
  width: "auto",
});
