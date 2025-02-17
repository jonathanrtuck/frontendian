"use client";

import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import styles from "./PdfViewer.module.css";
import { useTheme } from "@/hooks";
import type { ApplicationComponent } from "@/types";
import { Fragment, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

// @see https://github.com/wojtekmaj/react-pdf/tree/main#use-external-cdn
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// @see https://github.com/wojtekmaj/react-pdf
export const PdfViewer: ApplicationComponent = ({
  Content,
  Menu,
  Menubar,
  Menuitem,
  file,
  onAbout,
  onClose,
  onNew,
  onOpen,
  onQuit,
  openableFiles,
}) => {
  const theme = useTheme();
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const url = file?.url(theme) ?? null;

  return (
    <>
      <Menubar>
        <Menuitem title="File">
          <Menu>
            <Menuitem onClick={onNew} title="New" />
            <Menuitem title="Open">
              <Menu>
                {openableFiles.map(({ id, title }) => (
                  <Menuitem
                    disabled={id === file?.id}
                    key={id}
                    onClick={() => onOpen(id)}
                    title={title}
                  />
                ))}
              </Menu>
            </Menuitem>
            <Menuitem separator />
            <Menuitem
              disabled={!url}
              onClick={
                url
                  ? () => iframeRef.current?.contentWindow?.print()
                  : undefined
              }
              title="Print"
            />
            <Menuitem separator />
            <Menuitem onClick={onClose} title="Close" />
            <Menuitem onClick={onQuit} title="Quit" />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() =>
                onAbout(
                  <>
                    <p>
                      Renders{" "}
                      <a href="https://en.wikipedia.org/wiki/PDF">PDFs</a>.
                    </p>
                    <p>
                      Documents can be printed from the <b>File</b> menu.
                    </p>
                  </>
                )
              }
              title="About PDF Viewer…"
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content>
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
