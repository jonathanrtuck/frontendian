import { FunctionComponent, useContext } from "react";

import { Window } from "./components/Window";
import { StateContext } from "contexts";

export const Windows: FunctionComponent<{}> = () => {
  const [state] = useContext(StateContext);

  return (
    <>
      {state.windows.map((window) => {
        const application = state.applications.find(({ windowIds }) =>
          windowIds.includes(window.id)
        );
        const stackingIndex = state.stackingOrder.indexOf(window.id);

        return application ? (
          <Window
            Component={application?.Component}
            key={window.id}
            stackingIndex={stackingIndex}
            window={window}
          />
        ) : null;
      })}
    </>
  );
};
