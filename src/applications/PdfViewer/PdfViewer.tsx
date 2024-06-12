import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";

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
>(({ file, onAbout, onClose, onNew, onOpen, onQuit, openableFiles }, ref) => {
  const rootRef = useRef<HTMLIFrameElement>(null);

  const [numPages, setNumPages] = useState<number>(1);

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
      {
        items: [
          {
            onClick: onAbout,
            title: `About ${APPLICATION_PDF_VIEWER.title}…`,
          },
        ],
        title: "Help",
      },
    ],
    [onAbout, onClose, onNew, onOpen, onQuit, openableFiles]
  );

  useImperativeHandle(ref, () => ({}), []);

  useMenubar(menubaritems);

  // parse pdf to get number of pages
  useEffect(() => {
    if (file?.url) {
      const controller = new AbortController();

      fetch(file.url, {
        signal: controller.signal,
      })
        .then((response) => response.text())
        .then((text) => text.match(/\/Pages (\d+)/)?.[1])
        .then((numPagesStr) => {
          if (numPagesStr) {
            const numPages = Number(numPagesStr);

            if (!isNaN(numPages)) {
              setNumPages(numPages);
            }
          }
        })
        .catch(() => {});

      return () => {
        controller.abort("unmount");
      };
    }
  }, [file?.url]);

  if (file?.type !== MimeType.ApplicationPdf) {
    return null;
  }

  return (
    <iframe
      className={styles.root}
      height={file.height * numPages}
      ref={rootRef}
      src={`${file.url}#toolbar=0&navpanes=0`} // hide chrome's chrome
      title={file.title}
      width={file.width}
    />
  );
});

export const APPLICATION_PDF_VIEWER: Application = {
  about: (
    <>
      <p>
        Renders <a href="https://en.wikipedia.org/wiki/PDF">PDFs</a> in an{" "}
        <a href="https://html.spec.whatwg.org/#the-iframe-element">iframe</a>.
      </p>
      <p>
        Documents can be printed from the <b>File</b> menu.
      </p>
      <h4>Notes</h4>
      <p>
        For security reasons, the parent document does not have access to the
        iframe's embedded browsing context. Thus, it is impossible for this{" "}
        <code>Window</code> to determine if the embedded document has focus 😔.
      </p>
    </>
  ),
  Component: PdfViewer,
  getWindow: (file) => {
    const window = {
      height: 600,
      title: file?.title || "PDF Viewer",
    };
    const width = file && "width" in file ? file.width : undefined;

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
