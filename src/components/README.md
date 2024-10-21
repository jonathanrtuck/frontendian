# components

Flat directory of all UI components

## adding components

- add `ComponentName` in `/src/types.ts`
- create component file here
  - set its `displayName`
- create component stylesheet for each theme in `/src/styles/`
  - use the `useStyles` hook in `/src/hooks.ts` to access the CSS Module styles (generated `className`s) for the current theme
- use the `useStore` hook in `/src/hooks.ts` to read the state
  - use the action creators in `/src/store.ts` to update the state
