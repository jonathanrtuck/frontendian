import clsx from "clsx";
import {
  forwardRef,
  useDeferredValue,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Markdown from "react-markdown";

import { Menubaritem, useMenubar } from "components/Menubar";
import { StyledEdit as Icon } from "icons";
import {
  Application,
  ApplicationComponentProps,
  ApplicationComponentRef,
} from "state/types";
import { MimeType } from "types";

import styles from "./StyledEdit.module.css";

// @todo handle loading styles
// @todo handle error styles
const StyledEdit = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, onAbout, onClose, onNew, onOpen, onQuit, openableFiles }, ref) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(
    ref,
    () => ({
      focus: inputRef.current
        ? () => {
            inputRef.current?.focus();
          }
        : undefined,
    }),
    []
  );

  const [fileContent, setFileContent] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [view, setView] = useState<"markdown" | "preview">(
    file?.type === MimeType.TextMarkdown && Boolean(file?.url)
      ? "preview"
      : "markdown"
  );

  const deferredInput = useDeferredValue<string>(input);

  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: onNew,
            title: "New",
          },
          {
            items: openableFiles.map(({ id, title }) => ({
              onClick: () => {
                onOpen(id);
              },
              title,
            })),
            title: "Open",
          },
          null,
          {
            onClick: onClose,
            title: "Close",
          },
          {
            onClick: onQuit,
            title: "Quit",
          },
        ],
        title: "File",
      },
      {
        items: [
          {
            checked: view === "markdown",
            onClick:
              view === "markdown"
                ? undefined
                : () => {
                    setView("markdown");
                  },
            title: "Markdown",
            type: "radio",
          },
          {
            checked: view === "preview",
            onClick:
              view === "preview"
                ? undefined
                : () => {
                    setView("preview");
                  },
            title: "Preview",
            type: "radio",
          },
        ],
        title: "View",
      },
      {
        items: [
          {
            onClick: onAbout,
            title: `About ${APPLICATION_STYLED_EDIT.title}…`,
          },
        ],
        title: "Help",
      },
    ],
    [onAbout, onClose, onNew, onOpen, onQuit, openableFiles, view]
  );
  const inputLines = useMemo<string[]>(() => input.split("\n"), [input]);
  const numInputCols = useMemo<number>(
    () => Math.max(...inputLines.map((line) => line.length)),
    [inputLines]
  );
  const numInputRows = useMemo<number>(() => inputLines.length, [inputLines]);

  useMenubar(menubaritems);

  useEffect(() => {
    if (file?.type === MimeType.TextMarkdown && Boolean(file?.url)) {
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
      file?.type === MimeType.TextMarkdown && Boolean(file?.url)
        ? "preview"
        : "markdown"
    );
  }, [file]);

  useEffect(() => {
    if (view === "markdown") {
      inputRef.current?.focus();
    }
  }, [view]);

  if (isLoading) {
    return <span>loading…</span>;
  }

  if (error) {
    return <span>error…</span>;
  }

  if (view === "markdown") {
    return (
      <textarea
        className={clsx(styles.root, styles.input)}
        cols={numInputCols}
        onInput={(e) => {
          setInput((e.target as HTMLTextAreaElement).value);
        }}
        ref={inputRef}
        rows={numInputRows}
        tabIndex={0}
        value={input}
      />
    );
  }

  return (
    <samp className={clsx(styles.root, styles.markdown)}>
      <Markdown>{deferredInput}</Markdown>
    </samp>
  );
});

export const APPLICATION_STYLED_EDIT: Application = {
  about: (
    <>
      <p>
        Edit and preview{" "}
        <a href="https://en.wikipedia.org/wiki/Markdown">markdown</a>.
      </p>
      <p>
        <b>View</b> can be toggled in the menu.
      </p>
    </>
  ),
  Component: StyledEdit,
  icon: <Icon />,
  id: "application-styled-edit",
  title: "StyledEdit",
  windowIds: [],
};
