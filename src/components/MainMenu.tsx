import { FunctionComponent } from "react";

import { APPLICATION_TRACKER } from "@/applications";
import { Menu, Menuitem } from "@/components";
import { FILE_README_MD } from "@/files";
import { openApplication, openFile, useStore } from "@/store";

export const MainMenu: FunctionComponent = () => {
  const applications = useStore((state) => state.applications);

  return (
    <Menu bar className="main-menu" vertical>
      <Menuitem
        className="main-menu__menuitem"
        classes={{
          button: "main-menu__menuitem__button",
          title: "main-menu__menuitem__title",
        }}
        title="frontendian">
        <Menu>
          <Menuitem
            onClick={() => {
              openFile({ id: FILE_README_MD.id });
            }}
            title={FILE_README_MD.title}
          />
          <Menuitem separator />
          {applications
            .filter(({ id }) => id !== APPLICATION_TRACKER.id)
            .map(({ Icon, id, title }) => (
              <Menuitem
                Icon={Icon}
                key={id}
                onClick={() => {
                  openApplication({ id });
                }}
                title={title}
              />
            ))}
        </Menu>
      </Menuitem>
    </Menu>
  );
};

MainMenu.displayName = "MainMenu";
