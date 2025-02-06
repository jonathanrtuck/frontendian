import { INITIAL_STATE, IS_DEBUG_MODE } from "@/constants";
import type { ID, State, Theme } from "@/types";
import { create } from "zustand";

type Actions = {
  setTheme(payload: { id: Theme["id"] }): void;
};

type OneOrMoreID = { id: ID } | { ids: ID[] };

type Store = State & Actions;

const isPayloadId = (payload: OneOrMoreID, id: ID): boolean =>
  ("id" in payload && id === payload.id) ||
  ("ids" in payload && payload.ids.includes(id));

const setState =
  <T>(
    actionType: string,
    updater: (payload: T) => (prevState: Store) => Store
  ) =>
  (payload: T): void => {
    if (IS_DEBUG_MODE) {
      /* eslint-disable no-console */
      console.groupCollapsed(actionType);

      if (payload) {
        console.debug(payload);
      }
      /* eslint-enable no-console */
    }

    useStore.setState(updater(payload));

    if (IS_DEBUG_MODE) {
      /* eslint-disable no-console */
      console.debug(useStore.getState());
      console.groupEnd();
      /* eslint-enable no-console */
    }
  };

const ACTIONS: Actions = {
  setTheme: setState<{
    id: Theme["id"];
  }>("setTheme", (payload) => (prevState) => ({
    ...prevState,
    currentThemeId: payload.id,
  })),
};

export const useStore = create<Store>()(() => ({
  ...INITIAL_STATE,
  ...ACTIONS,
}));
