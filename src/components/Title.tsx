import { type FunctionComponent } from "react";

export const Title: FunctionComponent<{ id: string; text: string }> = ({
  id,
  text,
}) => (
  <h1 className="title" id={id} title={text}>
    {text}
  </h1>
);
