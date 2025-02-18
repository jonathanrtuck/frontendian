"use client";

import styles from "./TextEditor.module.css";
import { title } from "./utils";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import type { Application } from "@/types";
import clsx from "clsx";
import { useDeferredValue, useEffect, useState } from "react";
import Markdown from "react-markdown";

export const TextEditor: Application["Component"] = ({ fileId, windowId }) => {
  const theme = useTheme();
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
              onClick={() => {
                // @todo
              }}
              title="New"
            />
            <Menuitem title="Open">
              <Menu>
                {openableFiles.map(({ id, title }) => (
                  <Menuitem
                    disabled={id === file?.id}
                    key={id}
                    onClick={() => {
                      // @todo
                    }}
                    title={title}
                  />
                ))}
              </Menu>
            </Menuitem>
            <Menuitem separator />
            <Menuitem
              onClick={() => {
                // @todo
              }}
              title="Close"
            />
            <Menuitem
              onClick={() => {
                // @todo
              }}
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
              onClick={() => {
                // @todo
              }}
              title={`About ${title(theme)}…`}
            />
          </Menu>
        </Menuitem>
      </Menubar>
      <Content>
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
