import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { Menubaritem, useMenubar } from "components/Menubar";
import { Graphics as Icon } from "icons";
import { StateContext } from "state/context";
import { getFilesByApplicationId } from "state/selectors";
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
>(({ application, file, window }, ref) => {
  const [state, dispatch] = useContext(StateContext);

  const rootRef = useRef<HTMLIFrameElement>(null);

  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: () => {
              dispatch({
                payload: {
                  applicationId: application.id,
                  type: "window",
                },
                type: "OPEN",
              });
            },
            title: "New",
          },
          {
            items: getFilesByApplicationId(state, application.id).map(
              ({ id, title }) => ({
                onClick: () => {
                  dispatch({
                    payload: {
                      ids: [id],
                      type: "file",
                      windowId: window.id,
                    },
                    type: "OPEN",
                  });
                },
                title,
              })
            ),
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
            onClick: () => {
              dispatch({
                payload: {
                  ids: [window.id],
                  type: "window",
                },
                type: "CLOSE",
              });
            },
            title: "Close",
          },
          {
            onClick: () => {
              dispatch({
                payload: {
                  ids: [application.id],
                  type: "application",
                },
                type: "CLOSE",
              });
            },
            title: "Quit",
          },
        ],
        title: "File",
      },
    ],
    [application.id, dispatch, state, window.id]
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
    const width = file && "width" in file ? file?.width : undefined;
    const window = {
      height: 600,
      title: file?.title || "PDF Viewer",
    };

    if (width) {
      return {
        ...window,
        width,
      };
    }

    return window;
  },
  icon: <Icon />,
  id: "application-pdf-viewer",
  title: "PDF Viewer",
  windowIds: [],
};
