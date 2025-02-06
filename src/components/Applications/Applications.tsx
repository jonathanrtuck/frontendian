"use client";

import { APPLICATION_FILE_MANAGER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { WindowHidden, WindowVisible } from "@/icons";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";
import * as styles from "./Applications.css";

export const Applications: FunctionComponent = () => {
  const applications = useStore((store) => store.applications);
  const blurWindow = useStore((store) => store.blurWindow);
  const closeApplication = useStore((store) => store.closeApplication);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const focusWindow = useStore((store) => store.focusWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const showWindow = useStore((store) => store.showWindow);
  const themes = useStore((store) => store.themes);
  const windows = useStore((store) => store.windows);
  const theme = themes.find(({ id }) => id === currentThemeId)!;

  switch (currentThemeId) {
    case THEME_BEOS.id:
      return (
        <Menu bar vertical>
          {openApplicationIds.map((applicationId) => {
            const { getTitle, Icon, windowIds } = applications.find(
              (application) => application.id === applicationId
            )!;
            const applicationWindows = windows.filter(({ id }) =>
              windowIds.includes(id)
            );

            return (
              <Menuitem Icon={Icon} key={applicationId} title={getTitle(theme)}>
                <Menu>
                  {applicationWindows.length === 0 ? (
                    <Menuitem disabled title="No windows" />
                  ) : (
                    <>
                      {applicationWindows.map(({ hidden, id, title }) => (
                        <Menuitem
                          Icon={hidden ? WindowHidden : WindowVisible}
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
    case THEME_MAC_OS_CLASSIC.id: {
      const focusedWindow = windows.find(({ focused }) => focused);
      const activeApplication = (
        focusedWindow
          ? applications.find(({ windowIds }) =>
              windowIds.includes(focusedWindow.id)
            )
          : applications.find(({ id }) => id === APPLICATION_FILE_MANAGER.id)
      )!;

      return (
        <Menu bar className={styles.root[currentThemeId]} horizontal>
          <Menuitem
            Icon={activeApplication.Icon}
            className={styles.menuitem[currentThemeId]}
            title={activeApplication.getTitle(theme)}>
            <Menu className={styles.menu[currentThemeId]}>
              <Menuitem
                disabled={false} // @todo
                onClick={() => {
                  // hideWindow({ ids: activeApplication.windowIds });
                }}
                title={`Hide ${activeApplication.getTitle(theme)}`}
              />
              <Menuitem
                disabled={false} // @todo
                onClick={() => {
                  // hideWindow({ ids: windowIds });
                }}
                title="Hide Others"
              />
              <Menuitem
                disabled={false} // @todo
                onClick={() => {
                  // showWindow({ ids: windowIds });
                }}
                title="Show all"
              />
              <Menuitem separator />
              {openApplicationIds.map((applicationId) => {
                const { getTitle, Icon, windowIds } = applications.find(
                  ({ id }) => id === applicationId
                )!;

                return (
                  <Menuitem
                    Icon={Icon}
                    checked={applicationId === activeApplication.id}
                    key={applicationId}
                    onClick={() => {
                      if (windowIds.length !== 0) {
                        focusWindow({ id: windowIds.at(0)! });
                      } else if (focusedWindow) {
                        blurWindow({ id: focusedWindow.id });
                      }
                    }}
                    title={getTitle(theme)}
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
