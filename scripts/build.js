/**
 * Inlines component HTML into index.html so the site works when opened directly (file://).
 * Run: node scripts/build.js
 * Edit files in src/components/ and src/templates/ then run again to update index.html.
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const TEMPLATE = path.join(ROOT, 'src', 'templates', 'index-template.html');
const OUT = path.join(ROOT, 'index.html');
const COMPONENTS_DIR = path.join(ROOT, 'src', 'components');

const PLACEHOLDERS = [
  'hero',
  'who-are-we',
  'what-we-build',
  'operational-impact',
  'core-capabilities',
  'how-we-deliver',
  'contact'
];

let html = fs.readFileSync(TEMPLATE, 'utf8');

for (const name of PLACEHOLDERS) {
  const file = path.join(COMPONENTS_DIR, name + '.html');
  const content = fs.readFileSync(file, 'utf8');
  html = html.replace('{{' + name + '}}', content.trim());
}

fs.writeFileSync(OUT, html, 'utf8');
console.log('Built index.html from components.');
