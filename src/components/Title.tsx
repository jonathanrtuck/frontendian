"use client";

import { TitleBarContext } from "@/components";
import type { FunctionComponent } from "react";
import { useContext } from "react";

export const Title: FunctionComponent<{
  text: string;
}> = ({ text }) => {
  const { id } = useContext(TitleBarContext);

  return (
    <h1 className="title" id={id} title={text}>
      {text}
    </h1>
  );
};

Title.displayName = "Title";
