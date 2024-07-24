import { FunctionComponent } from "react";

import { Menu } from "components/Menu";
import { MenuItem } from "components/MenuItem";
import { useStore } from "store";

export const Applications: FunctionComponent = () => {
  const close = useStore((actions) => actions.close);
  const focus = useStore((actions) => actions.focus);
  const hide = useStore((actions) => actions.hide);
  const show = useStore((actions) => actions.show);
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
            <MenuItem Icon={Icon} key={id} title={title}>
              <Menu>
                {applicationWindows.length === 0 ? (
                  <MenuItem disabled title="No windows" />
                ) : (
                  <>
                    {applicationWindows.map(({ id, title }) => (
                      <MenuItem
                        onClick={() => {
                          focus({ id });
                        }}
                        title={title}
                      />
                    ))}
                    <MenuItem separator />
                    <MenuItem
                      disabled={applicationWindows.every(
                        ({ hidden }) => hidden
                      )}
                      onClick={() => {
                        hide({ ids: applicationWindows.map(({ id }) => id) });
                      }}
                      title="Hide all"
                    />
                    <MenuItem
                      disabled={applicationWindows.every(
                        ({ hidden }) => !hidden
                      )}
                      onClick={() => {
                        show({ ids: applicationWindows.map(({ id }) => id) });
                      }}
                      title="Show all"
                    />
                    <MenuItem
                      onClick={() => {
                        close({ ids: applicationWindows.map(({ id }) => id) });
                      }}
                      title="Close all"
                    />
                  </>
                )}
              </Menu>
            </MenuItem>
          );
        })}
    </Menu>
  );
};
