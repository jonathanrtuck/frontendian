import { forwardRef, useImperativeHandle, useMemo, useRef } from "react";

import { Menubaritem, useMenubar } from "components/Menubar";
import { Graphics as Icon } from "icons";
import {
  Application,
  ApplicationComponentProps,
  ApplicationComponentRef,
} from "state/types";
import { MimeType } from "types";

import styles from "./PdfViewer.module.css";

/**
 * it is impossible to detect focus within a different browsing context (e.g.
 * iframe), so `Window` component incorrectly fires a "BLUR" event when focus
 * moves into this iframe. 🤷‍♂️😣
 */
const PdfViewer = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, onClose, onNew, onOpen, onQuit, openableFiles }, ref) => {
  const rootRef = useRef<HTMLIFrameElement>(null);

  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: onNew,
            title: "New",
          },
          {
            items: openableFiles.map(({ id, title }) => ({
              onClick: () => {
                onOpen(id);
              },
              title,
            })),
            title: "Open",
          },
          null,
          {
            onClick: () => {
              rootRef.current?.contentWindow?.print();
            },
            title: "Print…",
          },
          null,
          {
            onClick: onClose,
            title: "Close",
          },
          {
            onClick: onQuit,
            title: "Quit",
          },
        ],
        title: "File",
      },
    ],
    [onClose, onNew, onOpen, onQuit, openableFiles]
  );

  useImperativeHandle(ref, () => ({}), []);

  useMenubar(menubaritems);

  if (file?.type !== MimeType.ApplicationPdf) {
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

export const APPLICATION_PDF_VIEWER: Application = {
  Component: PdfViewer,
  getWindow: (file) => {
    const window = {
      height: 600,
      title: file?.title || "PDF Viewer",
    };
    const width = file && "width" in file ? file?.width : undefined;

    return width
      ? {
          ...window,
          width,
        }
      : window;
  },
  icon: <Icon />,
  id: "application-pdf-viewer",
  title: "PDF Viewer",
  windowIds: [],
};
