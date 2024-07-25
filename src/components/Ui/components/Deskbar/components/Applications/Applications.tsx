import { FunctionComponent } from "react";

import { Menu } from "@/components/Menu";
import { Menuitem } from "@/components/Menuitem";
import { useStore } from "@/store";

export const Applications: FunctionComponent = () => {
  const closeApplication = useStore((actions) => actions.closeApplication);
  const focusWindow = useStore((actions) => actions.focusWindow);
  const hideWindow = useStore((actions) => actions.hideWindow);
  const showWindow = useStore((actions) => actions.showWindow);
  const applications = useStore((state) => state.applications);
  const openApplicationIds = useStore((state) => state.openApplicationIds);
  const windows = useStore((state) => state.windows);

  return (
    <Menu bar vertical>
      {applications
        .filter(({ id }) => openApplicationIds.includes(id))
        .map(({ Icon, id, title, windowIds }) => {
          const applicationWindows = windows.filter(({ id }) =>
            windowIds.includes(id)
          );

          return (
            <Menuitem Icon={Icon} key={id} title={title}>
              <Menu>
                {applicationWindows.length === 0 ? (
                  <Menuitem disabled title="No windows" />
                ) : (
                  <>
                    {applicationWindows.map(({ id, title }) => (
                      <Menuitem
                        key={id}
                        onClick={() => {
                          focusWindow({ id });
                        }}
                        title={title}
                      />
                    ))}
                    <Menuitem separator />
                    <Menuitem
                      disabled={applicationWindows.every(
                        ({ hidden }) => hidden
                      )}
                      onClick={() => {
                        hideWindow({ ids: windowIds });
                      }}
                      title="Hide all"
                    />
                    <Menuitem
                      disabled={applicationWindows.every(
                        ({ hidden }) => !hidden
                      )}
                      onClick={() => {
                        showWindow({ ids: windowIds });
                      }}
                      title="Show all"
                    />
                    <Menuitem
                      onClick={() => {
                        closeApplication({ id });
                      }}
                      title="Close all"
                    />
                  </>
                )}
              </Menu>
            </Menuitem>
          );
        })}
    </Menu>
  );
};
