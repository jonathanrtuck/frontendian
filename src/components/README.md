# components

## state

the `useStore` hook (from `/src/store.ts`) can be used to read the current state

## styles

the component’s root element should have a `className="component-[component-name-in-kebab-case]"` prop, which can be used in CSS selectors

### themes

styles for each theme should be defined in `[component.displayName].[theme.id].css` and use the `:root.[theme.id]` ancestor selector
