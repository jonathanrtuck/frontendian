import { ReactElement } from "react";

export type Menuitem =
  | {
      checked?: boolean;
      icon?: ReactElement;
      onClick?(): void; // menuitem will be disabled if this is not defined
      title: string;
      type?: "checkbox" | "radio";
    }
  | Separator;

export type Menubaritem = {
  icon?: ReactElement;
  items: Menuitem[]; // menubaritem will be disabled if this is empty
  title: string;
};

export type Separator = null;
