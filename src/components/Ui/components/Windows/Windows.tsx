import { FunctionComponent } from "react";

import { Window } from "./components/Window";
import { useStore } from "store";

export const Windows: FunctionComponent = () => {
  // state
  const windows = useStore((state) => state.windows);

  return (
    <>
      {windows.map((window) => (
        <Window key={window.id} {...window} />
      ))}
    </>
  );
};
