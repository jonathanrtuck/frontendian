import {
  forwardRef,
  useContext,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react";

import { StateContext } from "contexts";
import { Menubaritem, useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

import styles from "./PdfViewer.module.css";

export const PdfViewer = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ application, file, window }, ref) => {
  const [, dispatch] = useContext(StateContext);

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
            title: "Open",
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
          null,
          {
            onClick: () => {
              rootRef.current?.contentWindow?.print();
            },
            title: "Print",
          },
          null,
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
    [application.id, dispatch, window.id]
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
