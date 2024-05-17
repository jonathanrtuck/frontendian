import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
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

import { Menubaritem, useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

import styles from "./StyledEdit.module.css";

// @todo handle loading styles
// @todo handle error styles
export const StyledEdit = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, onClose }, ref) => {
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

  const [input, setInput] = useState<string>("");
  const [view, setView] = useState<"markdown" | "preview">(
    file ? "preview" : "markdown"
  );

  const deferredInput = useDeferredValue<string>(input);

  const menubaritems = useMemo<Menubaritem[]>(
    () => [
      {
        items: [
          {
            onClick: onClose,
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
    ],
    [onClose, view]
  );

  useMenubar(menubaritems);

  const {
    data = "",
    error,
    isPending,
  } = useQuery({
    enabled: Boolean(file?.url),
    queryFn: file?.url
      ? () => fetch(file.url).then((response) => response.text())
      : undefined,
    queryKey: [file?.url],
  });

  useEffect(() => {
    if (!isPending && !error && data) {
      setInput(data);
    }
  }, [data, error, isPending]);

  useEffect(() => {
    if (view === "markdown") {
      inputRef.current?.focus();
    }
  }, [view]);

  if (file && isPending) {
    return <span>loading…</span>;
  }

  if (file && error) {
    return <span>error…</span>;
  }

  if (view === "markdown") {
    return (
      <textarea
        className={clsx(styles.root, styles.input)}
        onInput={(e) => {
          setInput((e.target as HTMLTextAreaElement).value);
        }}
        ref={inputRef}
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
