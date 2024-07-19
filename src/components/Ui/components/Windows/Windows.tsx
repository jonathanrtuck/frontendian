import { FunctionComponent, useContext } from "react";

import { Window } from "./components/Window";
import { StateContext } from "contexts";

export const Windows: FunctionComponent<{}> = () => {
  const [state] = useContext(StateContext);

  return (
    <>
      {state.windows.map((window) => (
        <Window key={window.id} {...window} />
      ))}
    </>
  );
};
