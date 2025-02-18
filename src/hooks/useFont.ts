"use client";

import type { NextFontWithVariable } from "next/dist/compiled/@next/font";
import { useLayoutEffect } from "react";

export const useFont = ({ variable }: NextFontWithVariable): void =>
  useLayoutEffect(() => {
    document.documentElement.classList.add(variable);

    return () => document.documentElement.classList.remove(variable);
  }, [variable]);
