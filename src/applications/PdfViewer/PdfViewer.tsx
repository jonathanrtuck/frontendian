import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import { Menubaritem, useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

import styles from "./PdfViewer.module.css";

export const PdfViewer = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, onClose }, ref) => {
  const rootRef = useRef<HTMLIFrameElement>(null);

  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: () => {
              rootRef.current?.contentWindow?.print();
            },
            title: "Print",
          },
          null,
          {
            onClick: onClose,
            title: "Quit",
          },
        ],
        title: "File",
      },
    ],
    [onClose]
  );

  useImperativeHandle(ref, () => ({}), []);

  useMenubar(menubaritems);

  if (file?.type !== "application/pdf") {
    return null;
  }

  return (
    <iframe
      className={styles.root}
      height={file.height}
      ref={rootRef}
      src={`${file.url}#toolbar=0&navpanes=0`} // hide chrome's chrome
      title={file.title}
      width={file.width}
    />
  );
});
