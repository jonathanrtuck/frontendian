import { forwardRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";

import { ApplicationComponentProps, ApplicationComponentRef } from "types";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// @see https://www.npmjs.com/package/react-pdf#configure-pdfjs-worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// @todo handle loading
export const PdfViewer = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, window }, ref) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  if (!file) {
    return null;
  }

  return (
    <div>
      <Document
        externalLinkTarget="_blank"
        file={file.url}
        loading={"loading…"}
        onLoadSuccess={({ numPages }) => {
          setPageNumbers(Array.from(new Array(numPages), (_, i) => i + 1));
        }}>
        {pageNumbers.map((i) => (
          <Page key={i} pageNumber={i} width={window.width} />
        ))}
      </Document>
    </div>
  );
});
