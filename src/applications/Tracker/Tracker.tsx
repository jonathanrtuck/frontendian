import { forwardRef } from "react";

import { ApplicationComponentProps, ApplicationComponentRef } from "state";

export const Tracker = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>((props, ref) => null);
