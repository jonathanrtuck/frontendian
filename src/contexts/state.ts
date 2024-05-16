import { createContext, Dispatch } from "react";

import { Action, State } from "types";

const EMPTY_STATE: State = {
  applications: [],
  desktop: [],
  files: [],
  openApplicationIds: [],
  stackingOrder: [],
  types: {},
  windows: [],
};

export const StateContext = createContext<[State, Dispatch<Action>]>([
  EMPTY_STATE,
  () => {},
]);
