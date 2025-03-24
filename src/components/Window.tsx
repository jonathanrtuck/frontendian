import { type Coordinates, type ID, type Pixels, type Size } from "@/types";
import clsx from "clsx";
import {
  type FunctionComponent,
  type HTMLAttributes,
  type RefObject,
  useRef,
  useState,
} from "react";
import Draggable from "react-draggable";
import { Resizable } from "react-resizable";

const MIN_HEIGHT: Pixels = 16 * 7; // 7rem
const MIN_WIDTH: Pixels = 16 * 10; // 10rem

export const Window: FunctionComponent<
  Omit<HTMLAttributes<HTMLElement>, "onDrag" | "onResize"> &
    Coordinates &
    Size & {
      current?: boolean;
      id: ID;
      onDrag?(coordinates: Coordinates): void;
      onResize?(size: Size): void;
      z: number;
    }
> = ({
  className,
  current = false,
  height,
  id,
  onDrag,
  onResize,
  style,
  width,
  x,
  y,
  z,
  ...props
}) => {
  const rootRef = useRef<HTMLElement>(null);
  const [size, setSize] = useState<Size>({
    height,
    width,
  });

  return (
    <Draggable
      cancel="[draggable='false'], .react-resizable-handle"
      disabled={!onDrag}
      nodeRef={rootRef as RefObject<HTMLElement>}
      onStart={({ shiftKey }) => (shiftKey ? false : undefined)}
      onStop={(_, coordinates) =>
        coordinates.x !== x || coordinates.y !== y
          ? onDrag?.(coordinates)
          : undefined
      }
      position={{
        x,
        y,
      }}>
      <Resizable
        axis="both"
        handle={onResize ? undefined : <span aria-hidden />}
        height={size.height === "auto" ? 0 : size.height}
        minConstraints={[MIN_WIDTH, MIN_HEIGHT]}
        onResize={onResize ? (_, data) => setSize(data.size) : undefined}
        onResizeStart={
          onResize
            ? () => (height === "auto" || width === "auto") && onResize?.(size)
            : undefined
        }
        onResizeStop={
          onResize
            ? (_, data) =>
                (data.size.height !== height || data.size.width !== width) &&
                onResize(size)
            : undefined
        }
        width={size.width === "auto" ? 0 : size.width}>
        <section
          {...props}
          aria-current={current}
          className={clsx("window", className)}
          id={id}
          ref={rootRef}
          style={{
            ...style,
            height:
              height === 0 || height === "auto" || size.height === 0
                ? "auto"
                : size.height,
            width: width === "auto" ? "auto" : size.width,
            zIndex: z,
          }}
        />
      </Resizable>
    </Draggable>
  );
};
