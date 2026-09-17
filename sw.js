const CACHE = 'streamtiti-v3';
const SHELL = ['./index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  // Only touch same-origin app-shell requests; always go straight to network for streams/playlists.
  if (url.origin !== self.location.origin) return;

  const isHtml = e.request.mode === 'navigate' || url.pathname.endsWith('index.html');
  if (isHtml) {
    // Network-first : on va toujours chercher la dernière version en ligne.
    // On ne retombe sur le cache que si le réseau est indisponible (mode hors-ligne).
    e.respondWith(
      fetch(e.request)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, copy));
          return res;
        })
        .catch(() => caches.match(e.request))
    );
    return;
  }

  if (SHELL.some(s => url.pathname.endsWith(s.replace('./','')))) {
    // Cache-first pour les fichiers statiques qui changent rarement.
    e.respondWith(caches.match(e.request).then((cached) => cached || fetch(e.request)));
  }
});
