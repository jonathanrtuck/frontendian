"use client";

import { WindowContext } from "@/contexts";
import type { FunctionComponent } from "react";
import { useContext } from "react";

export const Title: FunctionComponent<{
  text: string;
}> = ({ text }) => {
  const { id } = useContext(WindowContext);

  return (
    <h1 className="title" id={`${id}-title`} title={text}>
      {text}
    </h1>
  );
};

Title.displayName = "Title";
