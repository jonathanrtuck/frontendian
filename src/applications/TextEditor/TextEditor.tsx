"use client";

import "./TextEditor.css";
import { Content, Menu, Menubar, Menuitem } from "@/components";
import * as files from "@/files";
import { useTheme } from "@/hooks";
import { useStore } from "@/store";
import type { Application } from "@/types";
import { useDeferredValue, useEffect, useRef, useState } from "react";
import Markdown from "react-markdown";

export const TextEditor: Application["Component"] = ({ fileId, windowId }) => {
  const closeApplication = useStore((store) => store.closeApplication);
  const closeWindow = useStore((store) => store.closeWindow);
  const openFile = useStore((store) => store.openFile);
  const openWindow = useStore((store) => store.openWindow);
  const theme = useTheme();
  const file = fileId
    ? Object.values(files).find(({ id }) => id === fileId)
    : undefined;
  const textareaRef = useRef<HTMLTextAreaElement>(null);
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
        .catch(({ message, name }) =>
          name === "AbortError" ? undefined : setError(message)
        )
        .finally(() => setIsLoading(false));

      return () => {
        controller.abort();
        setIsLoading(false);
      };
    }
  }, [url]);
  useEffect(
    () => (!isLoading && !error && content ? setInput(content) : undefined),
    [error, content, isLoading]
  );
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
      </Menubar>
      <Content scrollable>
        {Boolean(isLoading) && "loading…"}
        {Boolean(!isLoading && error) && "error…"}
        {Boolean(!isLoading && !error && view === "markdown") && (
          <textarea
            autoFocus
            className="text-editor"
            cols={numInputCols}
            onInput={({ currentTarget }) => setInput(currentTarget.value)}
            ref={textareaRef}
            rows={numInputRows}
            value={input}
          />
        )}
        {Boolean(!isLoading && !error && view === "preview") && (
          <samp className="text-editor">
            <Markdown>{deferredInput}</Markdown>
          </samp>
        )}
      </Content>
    </>
  );
};

TextEditor.displayName = "TextEditor";
