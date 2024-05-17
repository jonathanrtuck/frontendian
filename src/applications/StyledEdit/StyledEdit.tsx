import clsx from "clsx";
import { useQuery } from "@tanstack/react-query";
import { forwardRef, useImperativeHandle, useRef } from "react";
import Markdown from "react-markdown";

import { useMenubar } from "hooks";
import { ApplicationComponentProps, ApplicationComponentRef } from "types";

import styles from "./StyledEdit.module.css";

// @todo handle loading styles
// @todo handle error styles
export const StyledEdit = forwardRef<
  ApplicationComponentRef,
  ApplicationComponentProps
>(({ file, onClose }, ref) => {
  const inputRef = useRef<HTMLDivElement>(null);

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

  useMenubar([
    {
      items: [
        {
          onClick: onClose,
          title: "Quit",
        },
      ],
      title: "File",
    },
  ]);

  const { data, error, isPending } = useQuery({
    enabled: Boolean(file?.url),
    queryFn: file?.url
      ? () => fetch(file.url).then((response) => response.text())
      : undefined,
    queryKey: [file?.url],
  });

  if (!file?.url) {
    return (
      <div
        className={clsx(styles.root, styles.input)}
        contentEditable
        ref={inputRef}
        tabIndex={0}
      />
    );
  }

  if (isPending) {
    return <span>loading…</span>;
  }

  if (error) {
    return <span>error…</span>;
  }

  return (
    <Markdown className={clsx(styles.root, styles.markdown)}>
      {data ?? ""}
    </Markdown>
  );
});
