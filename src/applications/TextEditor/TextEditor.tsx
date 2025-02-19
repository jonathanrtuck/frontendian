"use client";

import styles from "./TextEditor.module.css";
import { AboutTextEditor } from "./AboutTextEditor";
import { title } from "./utils";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import * as files from "@/files";
import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import type { Application } from "@/types";
import clsx from "clsx";
import { useDeferredValue, useEffect, useState } from "react";
import Markdown from "react-markdown";

export const TextEditor: Application["Component"] = ({ fileId, windowId }) => {
  const closeApplication = useStore((store) => store.closeApplication);
  const closeWindow = useStore((store) => store.closeWindow);
  const openDialog = useStore((store) => store.openDialog);
  const openFile = useStore((store) => store.openFile);
  const openWindow = useStore((store) => store.openWindow);
  const theme = useTheme();
  const file = fileId
    ? Object.values(files).find(({ id }) => id === fileId)
    : undefined;
  const [content, setContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<"markdown" | "preview">(
    file?.mimetype === "text/markdown" && Boolean(file?.url(theme))
      ? "preview"
      : "markdown"
  );
  const deferredInput = useDeferredValue<string>(input);
  const inputLines = input.split("\n");
  const numInputCols = Math.max(...inputLines.map((line) => line.length));
  const numInputRows = inputLines.length;
  const openableFiles = Object.values(files).filter(
    ({ mimetype }) => mimetype === "text/markdown"
  );
  const url = file?.mimetype === "text/markdown" ? file.url(theme) : null;

  useEffect(() => {
    if (url) {
      const controller = new AbortController();

      setError(null);
      setIsLoading(true);
      fetch(url, { signal: controller.signal })
        .then((response) => response.text())
        .then(setContent)
        .catch((error) => {
          if (error.name !== "AbortError") {
            setError(error.message);
          }
        })
        .finally(() => setIsLoading(false));

      return () => {
        controller.abort();
        setIsLoading(false);
      };
    }
  }, [url]);
  useEffect(() => {
    if (!isLoading && !error && content) {
      setInput(content);
    }
  }, [error, content, isLoading]);
  useEffect(
    () =>
      setView(
        file?.mimetype === "text/markdown" && Boolean(file?.url(theme))
          ? "preview"
          : "markdown"
      ),
    [file, theme]
  );

  return (
    <>
      <Menubar>
        <Menuitem title="File">
          <Menu>
            <Menuitem
              onClick={() => openWindow({ id: "application-text-editor" })}
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
              onClick={() => closeWindow({ id: windowId })}
              title="Close"
            />
            <Menuitem
              onClick={() =>
                closeApplication({ id: "application-text-editor" })
              }
              title="Quit"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="View">
          <Menu>
            <Menuitem
              checked={view === "markdown"}
              onClick={() => setView("markdown")}
              title="Markdown"
              type="radio"
            />
            <Menuitem
              checked={view === "preview"}
              onClick={() => setView("preview")}
              title="Preview"
              type="radio"
            />
          </Menu>
        </Menuitem>
        <Menuitem title="Help">
          <Menu>
            <Menuitem
              onClick={() =>
                theme === "mac-os-classic"
                  ? openWindow({
                      Component: AboutTextEditor,
                      id: "application-text-editor",
                    })
                  : openDialog({
                      Component: AboutTextEditor,
                      title: `About ${title(theme)}`,
                    })
              }
              title={`About ${title(theme)}…`}
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content scrollable>
        {Boolean(isLoading) && "loading…"}
        {Boolean(!isLoading && error) && "error…"}
        {Boolean(!isLoading && !error && view === "markdown") && (
          <textarea
            autoFocus
            className={clsx(styles.root, styles.markdown)}
            cols={numInputCols}
            onInput={(e) => setInput(e.currentTarget.value)}
            rows={numInputRows}
            value={input}
          />
        )}
        {Boolean(!isLoading && !error && view === "preview") && (
          <samp className={clsx(styles.root, styles.preview)}>
            <Markdown>{deferredInput}</Markdown>
          </samp>
        )}
      </Content>
    </>
  );
};

TextEditor.displayName = "TextEditor";
