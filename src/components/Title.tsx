"use client";

import { TitleBarContext } from "@/components";
import type { IconComponent } from "@/types";
import type { FunctionComponent } from "react";
import { useContext } from "react";

export const Title: FunctionComponent<{
  Icon?: IconComponent; // @todo
  text: string;
}> = ({ Icon, text }) => {
  const { id } = useContext(TitleBarContext);

  return (
    <h1 className="title" id={id} title={text}>
      {text}
    </h1>
  );
};

Title.displayName = "Title";
