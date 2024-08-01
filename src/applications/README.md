# applications

launchable applications

- Application’s `index.ts` should only export an `ApplicationConfiguration` (from `/src/types`)
- Applications should be isolated. Thus, they must not import anything from this repo that exists outside of its own directory (other than types)
- Applications must use dependency packages (e.g. `react`) from this repo
- Application components should use the received component props for rendering
  - `Content` for the main window content
  - `Menubar`, `Menuitem`, and `Menu` for an optional window menubar

## adding an application

- create application directory
- create `/src/[application]/index.ts`
  - export the `ApplicationConfiguration`
- add needed fonts
  - place font file(s) in `/public/fonts`
  - add `Font`(s) in `/src/fonts.ts`
  - add a css var for each `font-family` in `/src/index.css`
