# applications

- Applications should only export an `ApplicationComponent` (from `/src/types`)
- Applications should be isolated. Thus, they must not import anything from this repo that exists outside of its own directory
- Applications should use existing dependency packages (e.g. `react`) from this repo where possible
- Applications should use the received `useMenuItems` prop to set its `Window`’s menubar items
