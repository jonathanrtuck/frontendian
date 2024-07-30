import clsx from "clsx";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

import { ApplicationComponent } from "@/types";

import styles from "./StyledEdit.module.css";

export const StyledEdit: ApplicationComponent = ({
  Content,
  Menu,
  Menubar,
  Menuitem,
  file,
  openableFiles,
}) => {
  const rootRef = useRef<HTMLElement>(null);

  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<"markdown" | "preview">(
    file?.type === "text/markdown" && Boolean(file?.url)
      ? "preview"
      : "markdown"
  );

  const deferredInput = useDeferredValue<string>(input);

  const inputLines = input.split("\n");
  const numInputCols = Math.max(...inputLines.map((line) => line.length));
  const numInputRows = inputLines.length;

  useEffect(() => {
    if (file?.type === "text/markdown" && Boolean(file?.url)) {
      const controller = new AbortController();

      setError(null);
      setIsLoading(true);

      fetch(file.url, {
        signal: controller.signal,
      })
        .then((response) => response.text())
        .then(setFileContent)
        .catch((error) => {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });

      return () => {
        controller.abort();

        setIsLoading(false);
      };
    }
  }, [file]);

  useEffect(() => {
    if (!isLoading && !error && fileContent) {
      setInput(fileContent);
    }
  }, [error, fileContent, isLoading]);

  useEffect(() => {
    setView(
      file?.type === "text/markdown" && Boolean(file?.url)
        ? "preview"
        : "markdown"
    );
  }, [file]);

  useEffect(() => {
    if (view === "preview") {
      rootRef.current?.focus();
    }
  }, [view]);

  return (
    <>
      <Menubar>
        <Menuitem title="File">
          <Menu>
            <Menuitem
              onClick={() => {
                console.debug("new…");
              }}
              title="New"
            />
            <Menuitem title="Open">
              <Menu>
                {openableFiles.map(({ id, title }) => (
                  <Menuitem
                    key={id}
                    onClick={() => {
                      console.debug("open…", title);
                    }}
                    title={title}
                  />
                ))}
              </Menu>
            </Menuitem>
            <Menuitem separator />
            <Menuitem
              onClick={() => {
                console.debug("close…");
              }}
              title="Close"
            />
            <Menuitem
              onClick={() => {
                console.debug("quit…");
              }}
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="View">
          <Menu>
            <Menuitem
              checked={view === "markdown"}
              onClick={() => {
                setView("markdown");
              }}
              title="Markdown"
              type="radio"
            />
            <Menuitem
              checked={view === "preview"}
              onClick={() => {
                setView("preview");
              }}
              title="Preview"
              type="radio"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() => {
                console.debug("about…");
              }}
              title="About StyledEdit…"
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content>
        {isLoading && "loading…"}
        {!isLoading && error && "error…"}
        {!isLoading && !error && view === "markdown" && (
          <textarea
            autoFocus
            className={clsx(styles.root, styles.markdown)}
            cols={numInputCols}
            onInput={(e) => {
              setInput((e.target as HTMLTextAreaElement).value);
            }}
            rows={numInputRows}
            value={input}
          />
        )}
        {!isLoading && !error && view === "preview" && (
          <samp
            className={clsx(styles.root, styles.markdown)}
            ref={rootRef}
            tabIndex={-1}>
            <Markdown>{deferredInput}</Markdown>
          </samp>
        )}
      </Content>
    </>
  );
};
