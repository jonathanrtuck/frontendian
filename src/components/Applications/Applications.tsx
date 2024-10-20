import { FunctionComponent } from "react";

import { APPLICATION_FILE_MANAGER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { useStyles } from "@/hooks";
import { WindowHidden, WindowVisible } from "@/icons";
import {
  blurWindow,
  closeApplication,
  focusWindow,
  hideWindow,
  showWindow,
  useStore,
} from "@/store";
import { getTitle } from "@/utils";

import stylesBeos from "./Applications.beos.module.css";
import stylesMacOsClassic from "./Applications.mac-os-classic.module.css";

export const Applications: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);
  const openApplicationIds = useStore((state) => state.openApplicationIds);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  const styles = useStyles({
    "theme-beos": stylesBeos,
    "theme-mac-os-classic": stylesMacOsClassic,
  });

  switch (theme.id) {
    case "theme-beos":
      return (
        <Menu bar vertical>
          {openApplicationIds.map((applicationId) => {
            const application = applications.find(
              (application) => application.id === applicationId
            )!;
            const applicationWindows = windows.filter((window) =>
              application.windowIds.includes(window.id)
            );

            return (
              <Menuitem
                Icon={application.Icon}
                key={applicationId}
                title={getTitle(application)}>
                <Menu>
                  {applicationWindows.length === 0 ? (
                    <Menuitem disabled title="No windows" />
                  ) : (
                    <>
                      {applicationWindows.map((window) => (
                        <Menuitem
                          Icon={window.hidden ? WindowHidden : WindowVisible}
                          key={window.id}
                          onClick={() => {
                            focusWindow({ id: window.id });
                          }}
                          title={window.title}
                        />
                      ))}
                      <Menuitem separator />
                      <Menuitem
                        disabled={applicationWindows.every(
                          ({ hidden }) => hidden
                        )}
                        onClick={() => {
                          hideWindow({ ids: application.windowIds });
                        }}
                        title="Hide all"
                      />
                      <Menuitem
                        disabled={applicationWindows.every(
                          ({ hidden }) => !hidden
                        )}
                        onClick={() => {
                          showWindow({ ids: application.windowIds });
                        }}
                        title="Show all"
                      />
                      <Menuitem
                        onClick={() => {
                          closeApplication({ id: applicationId });
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
    case "theme-mac-os-classic": {
      const focusedWindow = windows.find(({ focused }) => focused);
      const activeApplication = (
        focusedWindow
          ? applications.find(({ windowIds }) =>
              windowIds.includes(focusedWindow.id)
            )
          : applications.find(({ id }) => id === APPLICATION_FILE_MANAGER.id)
      )!;

      return (
        <Menu bar className={styles.menubar} horizontal>
          <Menuitem
            Icon={activeApplication.Icon}
            className={styles.menuitem}
            title={getTitle(activeApplication)}>
            <Menu className={styles.menu}>
              <Menuitem
                disabled={false} // @todo
                onClick={() => {
                  // hideWindow({ ids: activeApplication.windowIds });
                }}
                title={`Hide ${activeApplication.title}`}
              />
              <Menuitem
                disabled={false} // @todo
                onClick={() => {
                  // hideWindow({ ids: application.windowIds });
                }}
                title="Hide Others"
              />
              <Menuitem
                disabled={false} // @todo
                onClick={() => {
                  // showWindow({ ids: application.windowIds });
                }}
                title="Show all"
              />
              <Menuitem separator />

              {openApplicationIds.map((applicationId) => {
                const application = applications.find(
                  (application) => application.id === applicationId
                )!;

                return (
                  <Menuitem
                    Icon={application.Icon}
                    checked={applicationId === activeApplication.id}
                    key={applicationId}
                    onClick={() => {
                      if (application.windowIds.length !== 0) {
                        focusWindow({ id: application.windowIds[0] });
                      } else if (focusedWindow) {
                        blurWindow({ id: focusedWindow.id });
                      }
                    }}
                    title={getTitle(application)}
                    type="radio"
                  />
                );
              })}
            </Menu>
          </Menuitem>
        </Menu>
      );
    }
  }
};

Applications.displayName = "Applications";
