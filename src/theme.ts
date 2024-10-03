import { CSSObject } from "@emotion/react";

import { useStore } from "@/store";
import { Theme } from "@/types";

export const byTheme = (obj: Record<Theme, CSSObject>): CSSObject =>
  obj[useStore.getState().settings.theme];
