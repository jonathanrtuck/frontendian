"use client";

import { Error as ErrorIcon } from "@/icons";
import { type FunctionComponent } from "react";

const Error: FunctionComponent = () => (
  <dialog id="dialog-error" open>
    <h1 className="visually-hidden" id="dialog-error-title">
      Error
    </h1>
    <ErrorIcon />
    <p>An unknown error has occured.</p>
    <p>Please reload the page.</p>
  </dialog>
);

export default Error;
