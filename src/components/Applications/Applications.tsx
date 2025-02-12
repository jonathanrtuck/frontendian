"use client";

import "./Applications.theme-mac-os-classic.css";
import { APPLICATION_FILE_MANAGER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { WindowHidden, WindowVisible } from "@/icons";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";
import { useState } from "react";

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
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  switch (currentThemeId) {
    case THEME_BEOS.id:
      return (
        <nav className="component-applications">
          <Menu bar>
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
                          onClick={() =>
                            closeApplication({ id: applicationId })
                          }
                          title="Close all"
                        />
                      </>
                    )}
                  </Menu>
                </Menuitem>
              );
            })}
          </Menu>
        </nav>
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
      const activeApplicationWindows = windows.filter(({ id }) =>
        activeApplication.windowIds.includes(id)
      );
      const otherApplicationWindows = windows.filter(
        ({ id }) => !activeApplication.windowIds.includes(id)
      );
      return (
        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
        <nav aria-expanded={isExpanded} className="component-applications">
          <button
            aria-hidden
            onClick={() => setIsExpanded((prevState) => !prevState)}
            role="presentation"
            type="button"
          />
          <Menu bar horizontal>
            <Menuitem
              Icon={activeApplication.Icon}
              title={activeApplication.getTitle({ themeId: currentThemeId })}>
              <Menu>
                <Menuitem
                  disabled={
                    activeApplication.windowIds.length === 0 ||
                    activeApplicationWindows.every(({ hidden }) => hidden)
                  }
                  onClick={() =>
                    activeApplicationWindows.forEach(({ hidden, id }) => {
                      if (!hidden) {
                        hideWindow({ id });
                      }
                    })
                  }
                  title={`Hide ${activeApplication.getTitle({
                    themeId: currentThemeId,
                  })}`}
                />
                <Menuitem
                  disabled={
                    openApplicationIds.length < 2 ||
                    otherApplicationWindows.every(({ hidden }) => hidden)
                  }
                  onClick={() =>
                    otherApplicationWindows.forEach(({ hidden, id }) => {
                      if (!hidden) {
                        hideWindow({ id });
                      }
                    })
                  }
                  title="Hide Others"
                />
                <Menuitem
                  disabled={windows.every(({ hidden }) => !hidden)}
                  onClick={() =>
                    windows.forEach(({ hidden, id }) => {
                      if (hidden) {
                        showWindow({ id });
                      }
                    })
                  }
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
        </nav>
      );
    }
  }
};

Applications.displayName = "Applications";
