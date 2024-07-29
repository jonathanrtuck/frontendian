import clsx from "clsx";
import { useDeferredValue, useEffect, useState } from "react";
import Markdown from "react-markdown";

import { ApplicationComponent } from "@/types";

import styles from "./StyledEdit.module.css";

export const StyledEdit: ApplicationComponent = ({ Content, file }) => {
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

  if (isLoading) {
    return <Content>loading…</Content>;
  }

  if (error) {
    return <Content>error…</Content>;
  }

  if (view === "markdown") {
    return (
      <Content>
        <textarea
          autoFocus
          className={clsx(styles.root, styles.input)}
          cols={numInputCols}
          onInput={(e) => {
            setInput((e.target as HTMLTextAreaElement).value);
          }}
          rows={numInputRows}
          value={input}
        />
      </Content>
    );
  }

  return (
    <Content>
      <samp className={clsx(styles.root, styles.markdown)}>
        <Markdown>{deferredInput}</Markdown>
      </samp>
    </Content>
  );
};
