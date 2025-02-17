import type { Theme } from "@/types";

export const title = (theme: Theme) => {
  switch (theme) {
    case "beos":
      return "StyledEdit";
    case "mac-os-classic":
      return "SimpleText";
  }
};
