# applications

- should only export an `ApplicationConfiguration` (from `/src/types`)
- should be isolated: must not import anything from this repo that exists outside of its own directory (other than types and themes)
- must use dependency packages (e.g. `react`) from this repo
- components should use the received component props for rendering
  - `Content` for the main window content
  - `Menubar`, `Menuitem`, and `Menu` for an optional menubar
