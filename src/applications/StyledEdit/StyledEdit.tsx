import clsx from "clsx";
import {
  FunctionComponent,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import Markdown from "react-markdown";

import { Menuitem } from "@/components/Menuitem";
import { StyledEdit as Icon } from "@/icons";
import { ApplicationComponent, ApplicationComponentProps } from "@/types";

import styles from "./StyledEdit.module.css";

const Component: FunctionComponent<ApplicationComponentProps> = ({
  file,
  useMenuitems,
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

  // @todo
  useMenuitems(
    [
      <Menuitem key="file" title="File" />,
      <Menuitem key="view" title="View" />,
      <Menuitem key="help" title="Help" />,
    ],
    []
  );

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
    return <span>loading…</span>;
  }

  if (error) {
    return <span>error…</span>;
  }

  if (view === "markdown") {
    return (
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
    );
  }

  return (
    <samp className={clsx(styles.root, styles.markdown)}>
      <Markdown>{deferredInput}</Markdown>
    </samp>
  );
};

Component.displayName = "StyledEdit";

export const APPLICATION_STYLED_EDIT: ApplicationComponent = {
  Component,
  Icon,
  id: "application-styled-edit",
  title: "StyledEdit",
};
