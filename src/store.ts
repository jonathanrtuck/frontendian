import { INITIAL_STATE, IS_DEBUG_MODE } from "@/constants";
import type { ID, Pixels, State, Theme } from "@/types";
import { create } from "zustand";

type OneOrMoreID = { id: ID } | { ids: ID[] };

const isPayloadId = (payload: OneOrMoreID, id: ID): boolean =>
  ("id" in payload && id === payload.id) ||
  ("ids" in payload && payload.ids.includes(id));

const setState =
  <T>(
    actionType: string,
    updater: (payload: T) => (prevState: State) => State
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

const ACTIONS = {
  blurWindow: setState<OneOrMoreID>("blurWindow", (payload) => (prevState) => ({
    ...prevState,
  })),
  closeApplication: setState<OneOrMoreID>(
    "closeApplication",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  closeWindow: setState<OneOrMoreID>(
    "closeWindow",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  collapseWindow: setState<OneOrMoreID>(
    "collapseWindow",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  expandWindow: setState<OneOrMoreID>(
    "expandWindow",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  focusSystemBar: setState<void>(
    "focusSystemBar",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  focusWindow: setState<OneOrMoreID>(
    "focusWindow",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  hideWindow: setState<OneOrMoreID>("hideWindow", (payload) => (prevState) => ({
    ...prevState,
  })),
  moveWindow: setState<OneOrMoreID & { left: Pixels; top: Pixels }>(
    "moveWindow",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  moveWindowTitlebar: setState<OneOrMoreID & { left: Pixels }>(
    "moveWindowTitlebar",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  openApplication: setState<OneOrMoreID>(
    "openApplication",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  openFile: setState<OneOrMoreID & { windowId?: ID }>(
    "openFile",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  openWindow: setState<OneOrMoreID>("openWindow", (payload) => (prevState) => ({
    ...prevState,
  })),
  resizeWindow: setState<OneOrMoreID & { height: Pixels; width: Pixels }>(
    "resizeWindow",
    (payload) => (prevState) => ({
      ...prevState,
    })
  ),
  setTheme: setState<{
    id: Theme["id"];
  }>("setTheme", (payload) => (prevState) => ({
    ...prevState,
    currentThemeId: payload.id,
  })),
  showWindow: setState<OneOrMoreID>("showWindow", (payload) => (prevState) => ({
    ...prevState,
  })),
  zoomWindow: setState<OneOrMoreID>("zoomWindow", (payload) => (prevState) => ({
    ...prevState,
  })),
};

export const useStore = create<State & Readonly<typeof ACTIONS>>()(() => ({
  ...INITIAL_STATE,
  ...ACTIONS,
}));
