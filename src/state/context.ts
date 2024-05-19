import { createContext, Dispatch } from "react";

import { EMPTY_STATE } from "./constants";
import { Action, State } from "./types";

export const StateContext = createContext<[State, Dispatch<Action>]>([
  EMPTY_STATE,
  () => {},
]);
