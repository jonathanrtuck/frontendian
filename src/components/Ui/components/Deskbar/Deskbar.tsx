import { FunctionComponent, useMemo, useRef } from "react";

import { Tray } from "./components/Tray";
import { Menu } from "components/Menu";
import { MenuItem } from "components/MenuItem";
import { DESKBAR_ID } from "consts";
import { useStore } from "store";
import { Application } from "types";

import styles from "./Deskbar.module.css";

export const Deskbar: FunctionComponent = () => {
  // state
  const applications = useStore((state) => state.applications);
  const openApplicationIds = useStore((state) => state.openApplicationIds);
  const stackingOrder = useStore((state) => state.stackingOrder);
  const windows = useStore((state) => state.windows);
  // actions
  const close = useStore((actions) => actions.close);
  const focus = useStore((actions) => actions.focus);
  const hide = useStore((actions) => actions.hide);
  const open = useStore((actions) => actions.open);
  const show = useStore((actions) => actions.show);

  const rootRef = useRef<HTMLElement>(null);

  const openApplications = useMemo<Application[]>(
    () => applications.filter(({ id }) => openApplicationIds.includes(id)),
    [applications, openApplicationIds]
  );

  return (
    <header
      className={styles.root}
      onFocus={({ relatedTarget }) => {
        if (!relatedTarget || !rootRef.current?.contains(relatedTarget)) {
          focus({ id: DESKBAR_ID });
        }
      }}
      ref={rootRef}
      style={{
        zIndex: stackingOrder.indexOf(DESKBAR_ID),
      }}>
      <Menu bar vertical>
        <MenuItem className={styles.menuButton} title="frontendian">
          <Menu>
            <MenuItem title="About frontendian" />
            <MenuItem separator />
            {applications.map(({ Icon, id, title }) => (
              <MenuItem
                Icon={Icon}
                key={id}
                onClick={() => {
                  open({ id, type: "application" });
                }}
                title={title}
              />
            ))}
          </Menu>
        </MenuItem>
      </Menu>
      <Tray />
      <Menu bar vertical>
        {openApplications.map(({ Icon, id, title, windowIds }) => {
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
                      <MenuItem title={title} />
                    ))}
                    <MenuItem separator />
                    <MenuItem
                      disabled={false}
                      onClick={() => {
                        hide({
                          ids: applicationWindows.map(({ id }) => id),
                        });
                      }}
                      title="Hide all"
                    />
                    <MenuItem
                      disabled={false}
                      onClick={() => {
                        show({
                          ids: applicationWindows.map(({ id }) => id),
                        });
                      }}
                      title="Show all"
                    />
                    <MenuItem
                      disabled={false}
                      onClick={() => {
                        close({
                          ids: applicationWindows.map(({ id }) => id),
                        });
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
    </header>
  );
};
