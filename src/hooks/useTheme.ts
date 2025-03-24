import { type Theme } from "@/types";
import { useMatches } from "react-router";

export const useTheme = (): Theme => useMatches()[0].handle as Theme;
