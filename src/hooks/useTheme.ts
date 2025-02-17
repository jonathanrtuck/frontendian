"use client";

import type { Theme } from "@/types";
import { usePathname } from "next/navigation";

export const useTheme = (): Theme => usePathname().slice(1) as Theme;
