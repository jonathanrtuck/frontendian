import { FunctionComponent } from "react";

import { Menu, Menuitem } from "@/components/Menu";
import { WindowHidden, WindowVisible } from "@/icons";
import {
  closeApplication,
  focusWindow,
  hideWindow,
  showWindow,
  useStore,
} from "@/store";

export const Applications: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);
  const openApplicationIds = useStore((state) => state.openApplicationIds);
  const windows = useStore((state) => state.windows);

  return (
    <Menu bar vertical>
      {openApplicationIds.map((applicationId) => {
        const application = applications.find(
          (application) => application.id === applicationId
        );

        if (!application) {
          return null;
        }

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
