import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import {
  forwardRef,
  useDeferredValue,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import Markdown from "react-markdown";

import { Menubaritem, useMenubar } from "components/Menubar";
import { StyledEdit as Icon } from "icons";
import { StateContext } from "state/context";
import { getFilesByApplicationId } from "state/selectors";
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
>(({ application, file, window }, ref) => {
  const [state, dispatch] = useContext(StateContext);

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
            onClick: () => {
              dispatch({
                payload: {
                  applicationId: application.id,
                  type: "window",
                },
                type: "OPEN",
              });
            },
            title: "New",
          },
          {
            items: getFilesByApplicationId(state, application.id).map(
              ({ id, title }) => ({
                onClick: () => {
                  dispatch({
                    payload: {
                      ids: [id],
                      type: "file",
                      windowId: window.id,
                    },
                    type: "OPEN",
                  });
                },
                title,
              })
            ),
            title: "Open",
          },
          null,
          {
            onClick: () => {
              dispatch({
                payload: {
                  ids: [window.id],
                  type: "window",
                },
                type: "CLOSE",
              });
            },
            title: "Close",
          },
          {
            onClick: () => {
              dispatch({
                payload: {
                  ids: [application.id],
                  type: "application",
                },
                type: "CLOSE",
              });
            },
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
    [application.id, dispatch, state, view, window.id]
  );
  const inputLines = useMemo<string[]>(() => input.split("\n"), [input]);
  const numInputCols = useMemo<number>(
    () => Math.max(...inputLines.map((line) => line.length)),
    [inputLines]
  );
  const numInputRows = useMemo<number>(() => inputLines.length, [inputLines]);

  useMenubar(menubaritems);

  const {
    data = "",
    error,
    isPending,
  } = useQuery({
    enabled: file?.type === MimeType.TextMarkdown && Boolean(file?.url),
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
    setView(file ? "preview" : "markdown");
  }, [file]);

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
        cols={numInputCols}
        onInput={(e) => {
          setInput((e.target as HTMLTextAreaElement).value);
        }}
        ref={inputRef}
        rows={numInputRows}
        style={
          {
            // height: inputHeight,
          }
        }
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
  Component: StyledEdit,
  icon: <Icon />,
  id: "application-styled-edit",
  title: "Styled Edit",
  windowIds: [],
};
