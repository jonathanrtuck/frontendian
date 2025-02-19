"use client";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import * as files from "@/files";
import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import type { Application } from "@/types";
import { Fragment, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// @see https://github.com/wojtekmaj/react-pdf/tree/main#use-external-cdn
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// @see https://github.com/wojtekmaj/react-pdf
export const PdfViewer: Application["Component"] = ({ fileId, windowId }) => {
  const closeApplication = useStore((store) => store.closeApplication);
  const closeWindow = useStore((store) => store.closeWindow);
  const openDialog = useStore((store) => store.openDialog);
  const openFile = useStore((store) => store.openFile);
  const openWindow = useStore((store) => store.openWindow);
  const theme = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const file = fileId
    ? Object.values(files).find(({ id }) => id === fileId)
    : undefined;
  const openableFiles = Object.values(files).filter(
    ({ mimetype }) => mimetype === "application/pdf"
  );
  const url = file?.url(theme) ?? null;

  return (
    <>
      <Menubar>
        <Menuitem title="File">
          <Menu>
            <Menuitem
              onClick={() => openWindow({ id: "application-pdf-viewer" })}
              title="New"
            />
            <Menuitem title="Open">
              <Menu>
                {openableFiles.map(({ id, title }) => (
                  <Menuitem
                    disabled={id === file?.id}
                    key={id}
                    onClick={() =>
                      openFile({
                        id,
                        windowId,
                      })
                    }
                    title={title}
                  />
                ))}
              </Menu>
            </Menuitem>
            <Menuitem separator />
            <Menuitem
              disabled={!url}
              onClick={
                url ? iframeRef.current?.contentWindow?.print : undefined
              }
              title="Print"
            />
            <Menuitem separator />
            <Menuitem
              onClick={() => closeWindow({ id: windowId })}
              title="Close"
            />
            <Menuitem
              onClick={() => closeApplication({ id: "application-pdf-viewer" })}
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                // @todo openDialog or openWindow
              }}
              title="About PDF Viewer…"
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content scrollable>
        {file && url ? (
          <>
            <Document
              file={url}
              loading={<Fragment />} // eslint-disable-line react/jsx-no-useless-fragment
              onLoadSuccess={({ numPages }) => setNumPages(numPages)}>
              {Array.from(new Array(numPages)).map((_, i) => (
                <Page
                  className={styles.page}
                  key={i} // eslint-disable-line react/no-array-index-key
                  pageIndex={i}
                  scale={1.25}
                />
              ))}
            </Document>
            <iframe hidden ref={iframeRef} src={url} />
          </>
        ) : null}
      </Content>
    </>
  );
};

PdfViewer.displayName = "PdfViewer";
