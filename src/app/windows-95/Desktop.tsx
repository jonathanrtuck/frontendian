"use client";

import { Grid, Icon, SystemBar } from "@/components";
import * as files from "@/files";
import { File, Pdf, Text } from "@/icons";
import { useStore } from "@/store";
import { type IconComponent, type MimeType } from "@/types";
import { type FunctionComponent } from "react";

const ICONS: Partial<Record<MimeType, IconComponent>> = {
  "application/pdf": Pdf,
  "text/markdown": Text,
};

export const Desktop: FunctionComponent = () => {
  const openFile = useStore((store) => store.openFile);

  return (
    <>
      <Grid>
        {Object.values(files).map(({ id, mimetype, title }) => (
          <Icon
            Icon={ICONS[mimetype] ?? File}
            key={id}
            onDoubleClick={() => openFile({ id })}
            title={title}
          />
        ))}
      </Grid>
      <SystemBar title="">system bar…</SystemBar>
    </>
  );
};
