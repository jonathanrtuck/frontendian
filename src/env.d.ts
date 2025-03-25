/// <reference types="@rsbuild/core/types" />

declare module "*.svg" {
  export const ReactComponent: import("./types").IconComponent;
}
