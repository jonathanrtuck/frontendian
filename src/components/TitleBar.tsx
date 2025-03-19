import { type Percentage } from "@/types";
import { type FunctionComponent, type PropsWithChildren } from "react";

export const TitleBar: FunctionComponent<
  PropsWithChildren<{
    left?: Percentage;
    onDoubleClick?(): void;
    onDrag?(left: Percentage): void;
  }>
> = ({ children }) => <header className="title-bar">{children}</header>;
