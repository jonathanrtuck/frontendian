import clsx from "clsx";
import { useDeferredValue, useEffect, useState } from "react";
import Markdown from "react-markdown";

import { ApplicationComponent } from "@/types";

import styles from "./StyledEdit.module.css";

export const StyledEdit: ApplicationComponent = ({
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
                    onClick={() => {
                      onOpen(id);
                    }}
                    title={title}
                  />
                ))}
              </Menu>
            </Menuitem>
            <Menuitem separator />
            <Menuitem onClick={onClose} title="Close" />
            <Menuitem onClick={onQuit} title="Quit" />
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
                onAbout(
                  <>
                    <p>
                      Edit and preview{" "}
                      <a href="https://en.wikipedia.org/wiki/Markdown">
                        markdown
                      </a>
                      .
                    </p>
                    <p>
                      <b>View</b> can be toggled in the menu.
                    </p>
                  </>
                );
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
              setInput(e.currentTarget.value);
            }}
            rows={numInputRows}
            value={input}
          />
        )}
        {!isLoading && !error && view === "preview" && (
          <samp className={clsx(styles.root, styles.preview)}>
            <Markdown>{deferredInput}</Markdown>
          </samp>
        )}
      </Content>
    </>
  );
};
