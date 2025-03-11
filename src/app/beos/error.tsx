"use client";

import { Dialog } from "@/components";
import { Error as Icon } from "@/icons";
import { type FunctionComponent } from "react";

const Error: FunctionComponent = () => (
  <Dialog Icon={Icon} id="dialog-error">
    <h1 className="visually-hidden" id="dialog-error-title">
      Error
    </h1>
    <p>An unknown error has occured.</p>
    <p>Please reload the page.</p>
  </Dialog>
);

export default Error;
