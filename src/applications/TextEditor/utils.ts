import { Theme } from "@/types";

export const getTitle = (theme: Theme) => {
  switch (theme.id) {
    case "theme-beos":
      return "StyledEdit";
    case "theme-mac-os-classic":
      return "SimpleText";
  }
};
