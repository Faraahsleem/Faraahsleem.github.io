/**
 * Loads HTML components into the page.
 * Run the site with a local server (e.g. "npx serve" or Live Server) so fetch() can load the component files.
 */
(function () {
  var components = [
    { id: 'hero', url: 'src/components/hero.html' },
    { id: 'who-are-we', url: 'src/components/who-are-we.html' },
    { id: 'what-we-build', url: 'src/components/what-we-build.html' },
    { id: 'operational-impact', url: 'src/components/operational-impact.html' },
    { id: 'core-capabilities', url: 'src/components/core-capabilities.html' },
    { id: 'how-we-deliver', url: 'src/components/how-we-deliver.html' },
    { id: 'contact', url: 'src/components/contact.html' }
  ];

  function loadComponent(entry) {
    var el = document.getElementById(entry.id);
    if (!el) return Promise.resolve();

    return fetch(entry.url)
      .then(function (res) { return res.text(); })
      .then(function (html) {
        el.innerHTML = html;
      })
      .catch(function (err) {
        console.warn('Could not load component: ' + entry.url, err);
        el.innerHTML = '<p style="color:#888; padding:2rem;">Component failed to load. Open the site with a local server (e.g. <code>npx serve</code> or Live Server).</p>';
      });
  }

  Promise.all(components.map(loadComponent)).catch(function (err) {
    console.error('Component load error:', err);
  });
})();
