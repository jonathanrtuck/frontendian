import { forwardRef, useImperativeHandle, useRef } from "react";

import { useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

import styles from "./PdfViewer.module.css";

export const PdfViewer = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, onClose }, ref) => {
  const rootRef = useRef<HTMLIFrameElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: rootRef.current
        ? () => {
            rootRef.current?.focus();
          }
        : undefined,
    }),
    []
  );

  useMenubar([
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
  ]);

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
