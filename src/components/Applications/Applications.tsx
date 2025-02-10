"use client";

import { APPLICATION_FILE_MANAGER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { WindowHidden, WindowVisible } from "@/icons";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";

export const Applications: FunctionComponent = () => {
  const applications = useStore((store) => store.applications);
  const blurWindow = useStore((store) => store.blurWindow);
  const closeApplication = useStore((store) => store.closeApplication);
  const currentThemeId = useStore((store) => store.currentThemeId);
  const focusWindow = useStore((store) => store.focusWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const showWindow = useStore((store) => store.showWindow);
  const windows = useStore((store) => store.windows);

  switch (currentThemeId) {
    case THEME_BEOS.id:
      return (
        <Menu bar className="component-applications">
          {openApplicationIds.map((applicationId) => {
            const { getTitle, Icon, windowIds } = applications.find(
              (application) => application.id === applicationId
            )!;
            const applicationWindows = windows.filter(({ id }) =>
              windowIds.includes(id)
            );

            return (
              <Menuitem
                Icon={Icon}
                key={applicationId}
                title={getTitle({ themeId: currentThemeId })}>
                <Menu>
                  {applicationWindows.length === 0 ? (
                    <Menuitem disabled title="No windows" />
                  ) : (
                    <>
                      {applicationWindows.map(({ hidden, id, title }) => (
                        <Menuitem
                          Icon={hidden ? WindowHidden : WindowVisible}
                          key={id}
                          onClick={() => focusWindow({ id })}
                          title={title}
                        />
                      ))}
                      <Menuitem separator />
                      <Menuitem
                        disabled={applicationWindows.every(
                          ({ hidden }) => hidden
                        )}
                        onClick={() =>
                          windowIds.map((id) => ({ id })).forEach(hideWindow)
                        }
                        title="Hide all"
                      />
                      <Menuitem
                        disabled={applicationWindows.every(
                          ({ hidden }) => !hidden
                        )}
                        onClick={() =>
                          windowIds.map((id) => ({ id })).forEach(showWindow)
                        }
                        title="Show all"
                      />
                      <Menuitem
                        onClick={() => closeApplication({ id: applicationId })}
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
        <Menu bar className="component-applications" horizontal>
          <Menuitem
            Icon={activeApplication.Icon}
            title={activeApplication.getTitle({ themeId: currentThemeId })}>
            <Menu>
              <Menuitem
                disabled={false} // @todo
                onClick={() => {}}
                title={`Hide ${activeApplication.getTitle({
                  themeId: currentThemeId,
                })}`}
              />
              <Menuitem
                disabled={false} // @todo
                onClick={() => {}}
                title="Hide Others"
              />
              <Menuitem
                disabled={false} // @todo
                onClick={() => {}}
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
                    title={getTitle({ themeId: currentThemeId })}
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
