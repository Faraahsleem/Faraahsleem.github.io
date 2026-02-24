# Fonts for Beyond Code Interface

Use **Montserrat** as the only font family. Load these weights:

| Use case | Weight | CSS `font-weight` | Where |
|----------|--------|-------------------|--------|
| Main title ("Beyond Code") | **Bold** | `700` | `.title` |
| Subtitle ("Operational Intelligence...") | **Semi-Bold** | `600` | `.subtitle` |
| Body / description | **Regular** | `400` | `.description` |

## Adding to your project

### Option 1: Google Fonts (already in `index.html`)
```html
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet" />
```

### Option 2: npm (e.g. for React/Vite)
```bash
npm install @fontsource/montserrat
```
Then import in your entry file:
```js
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/600.css';
import '@fontsource/montserrat/700.css';
```

### Option 3: Download from Google Fonts
- Go to [Google Fonts – Montserrat](https://fonts.google.com/specimen/Montserrat)
- Download the family and add the weights: **Regular (400)**, **SemiBold (600)**, **Bold (700)**.

All text in the interface is **#FFFFFF** (white).
