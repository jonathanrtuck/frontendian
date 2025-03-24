import { type Percentage, type Pixels } from "@/types";
import clsx from "clsx";
import {
  type FunctionComponent,
  type HTMLAttributes,
  type RefObject,
  useState,
  useRef,
} from "react";
import Draggable from "react-draggable";

export const TitleBar: FunctionComponent<
  Omit<HTMLAttributes<HTMLElement>, "onDoubleClick" | "onDrag"> & {
    left?: Percentage;
    onDoubleClick?(): void;
    onDrag?(left: Percentage): void;
  }
> = ({ className, left = 0, onDoubleClick, onDrag, ...props }) => {
  const rootRef = useRef<HTMLElement>(null);
  const [maxLeft, setMaxLeft] = useState<Pixels>(0);

  return (
    <Draggable
      axis="x"
      bounds="parent"
      cancel="[draggable='false']"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={({ shiftKey }) => (shiftKey ? undefined : false)}
      onStop={(_, { x }) =>
        onDrag?.(Math.max(0, Math.min(maxLeft <= 0 ? 0 : x / maxLeft, 1)))
      }
      position={{
        x: left * maxLeft,
        y: 0,
      }}>
      <header
        {...props}
        className={clsx("title-bar", className)}
        onDoubleClick={
          onDoubleClick
            ? ({ target }) =>
                !(target instanceof HTMLButtonElement)
                  ? onDoubleClick()
                  : undefined
            : undefined
        }
        ref={rootRef}
      />
    </Draggable>
  );
};
