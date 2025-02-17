import type { Theme } from "@/types";

// @todo
export const getTitle = ({ themeId }: { themeId: Theme }): string =>
  ({
    ["beos"]: "StyledEdit",
    ["mac-os-classic"]: "SimpleText",
  }[themeId]);
