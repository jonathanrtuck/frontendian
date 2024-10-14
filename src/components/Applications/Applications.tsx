import { FunctionComponent } from "react";

import { APPLICATION_TRACKER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { WindowHidden, WindowVisible } from "@/icons";
import {
  blurWindow,
  closeApplication,
  focusWindow,
  hideWindow,
  showWindow,
  useStore,
} from "@/store";

import styles from "./Applications.module.css";

export const Applications: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);
  const openApplicationIds = useStore((state) => state.openApplicationIds);
  const theme = useStore((state) => state.theme);
  const windows = useStore((state) => state.windows);

  const focusedWindow = windows.find(({ focused }) => focused);
  const activeApplication = (
    focusedWindow
      ? applications.find(({ windowIds }) =>
          windowIds.includes(focusedWindow.id)
        )
      : applications.find(({ id }) => id === APPLICATION_TRACKER.id)
  )!;

  if (!theme.components.menubar.windowed) {
    return (
      <Menu bar className={styles.menubar} horizontal>
        <Menuitem
          Icon={activeApplication.Icon}
          className={styles.menuitem}
          title={activeApplication.title}>
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
              const applicationWindows = windows.filter((window) =>
                application.windowIds.includes(window.id)
              );

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
                  title={application.title}
                  type="radio"
                />
              );
            })}
          </Menu>
        </Menuitem>
      </Menu>
    );
  }

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
            title={application.title}>
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
                    disabled={applicationWindows.every(({ hidden }) => hidden)}
                    onClick={() => {
                      hideWindow({ ids: application.windowIds });
                    }}
                    title="Hide all"
                  />
                  <Menuitem
                    disabled={applicationWindows.every(({ hidden }) => !hidden)}
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
};

Applications.displayName = "Applications";
