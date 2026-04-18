// Service Worker - 禁用缓存，始终从网络获取
self.addEventListener('install', event => {
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  // 清除所有缓存
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => caches.delete(key)));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // 所有请求都直接走网络，不缓存
  event.respondWith(fetch(event.request));
});
