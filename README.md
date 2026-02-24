# beyond-code-interface

Static website for Beyond Code.

## Project structure

- `index.html` - generated, deploy-ready page (keep at repo root for easy hosting)
- `assets/` - static files used by the site
- `assets/css/main.css` - site styles
- `assets/fonts/` - local fonts
- `assets/images/` - images and icons
- `src/components/` - section partials used to build `index.html`
- `src/templates/index-template.html` - page template with component placeholders
- `src/scripts/main.js` - optional runtime component loader (server mode)
- `scripts/build.js` - build script that inlines components into root `index.html`
- `docs/` - project notes/reference docs
- `archive/` - legacy/prototype files kept for reference

## Build

```bash
node scripts/build.js
```

This regenerates `index.html` from `src/templates/index-template.html` and all files in `src/components/`.
