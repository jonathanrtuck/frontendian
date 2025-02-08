import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import { Theme } from "@/types";

export const getTitle = (theme: Theme): string =>
  ({
    [THEME_BEOS.id]: "StyledEdit",
    [THEME_MAC_OS_CLASSIC.id]: "SimpleText",
  }[theme.id]);
