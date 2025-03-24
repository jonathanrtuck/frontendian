# components

all _components_ used in the UI

## note

- _components_ SHOULD add `className="[component-name]"` to their root html element
- conditional `className`s MAY be used, but MUST be prefixed with _is_ or _has_
- _components_ SHOULD avoid referencing the current theme (e.g. `useTheme` from `@/hooks`). instead prefer to move conditional rendering to `Desktop.tsx`s
- _components_ SHOULD avoid referencing the store (e.g. `useStore` from `@/store`). instead prefer to move conditional rendering and actions to `Desktop.tsx`s
