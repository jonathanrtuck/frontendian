import { forwardRef } from "react";

import { ApplicationComponentProps, ApplicationComponentRef } from "types";

export const Tracker = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>((props, ref) => null);
