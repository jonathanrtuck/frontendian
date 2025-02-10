import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import { Theme } from "@/types";

export const getTitle = ({ themeId }: { themeId: Theme["id"] }): string =>
  ({
    [THEME_BEOS.id]: "StyledEdit",
    [THEME_MAC_OS_CLASSIC.id]: "SimpleText",
  }[themeId]);
