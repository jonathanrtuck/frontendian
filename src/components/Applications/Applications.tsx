"use client";

import "./Applications.theme-mac-os-classic.css";
import * as applications from "@/applications";
import { Menu, Menuitem } from "@/components";
import { WindowHidden, WindowVisible } from "@/icons";
import { useStore } from "@/store";
import { THEME_BEOS, THEME_MAC_OS_CLASSIC } from "@/themes";
import type { FunctionComponent } from "react";
import { useState } from "react";

export const Applications: FunctionComponent = () => {
  const blurWindow = useStore((store) => store.blurWindow);
  const closeApplication = useStore((store) => store.closeApplication);
  const focusWindow = useStore((store) => store.focusWindow);
  const hideWindow = useStore((store) => store.hideWindow);
  const openApplicationIds = useStore((store) => store.openApplicationIds);
  const showWindow = useStore((store) => store.showWindow);
  const themeId = useStore((store) => store.themeId);
  const windows = useStore((store) => store.windows);
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  switch (themeId) {
    case THEME_BEOS.id:
      return (
        <nav className="component-applications">
          <Menu bar>
            {openApplicationIds.map((applicationId) => {
              const application = Object.values(applications).find(
                (application) => application.id === applicationId
              )!;
              const applicationWindows = windows.filter(
                ({ applicationId }) => applicationId === application.id
              );

              return (
                <Menuitem
                  Icon={application.Icon}
                  key={applicationId}
                  title={application.getTitle({ themeId })}>
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
                            applicationWindows
                              .map(({ id }) => ({ id }))
                              .forEach(hideWindow)
                          }
                          title="Hide all"
                        />
                        <Menuitem
                          disabled={applicationWindows.every(
                            ({ hidden }) => !hidden
                          )}
                          onClick={() =>
                            applicationWindows
                              .map(({ id }) => ({ id }))
                              .forEach(showWindow)
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
      const activeApplication = Object.values(applications).find(
        ({ id }) =>
          id ===
          (focusedWindow?.applicationId ??
            applications.APPLICATION_FILE_MANAGER.id)
      )!;
      const activeApplicationWindows = windows.filter(
        ({ applicationId }) => applicationId === activeApplication.id
      );
      const otherApplicationWindows = windows.filter(
        ({ applicationId }) => applicationId !== activeApplication.id
      );

      return (
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
              title={activeApplication.getTitle({ themeId })}>
              <Menu>
                <Menuitem
                  disabled={
                    activeApplicationWindows.length === 0 ||
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
                    themeId,
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
                  const application = Object.values(applications).find(
                    ({ id }) => id === applicationId
                  )!;
                  const firstApplicationWindow = windows.find(
                    ({ applicationId }) => applicationId === application.id
                  );

                  return (
                    <Menuitem
                      Icon={application.Icon}
                      checked={applicationId === activeApplication.id}
                      key={applicationId}
                      onClick={() => {
                        if (firstApplicationWindow) {
                          focusWindow({ id: firstApplicationWindow.id });
                        } else if (focusedWindow) {
                          blurWindow({ id: focusedWindow.id });
                        }
                      }}
                      title={application.getTitle({ themeId })}
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
