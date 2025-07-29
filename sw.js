const CACHE_NAME = 'tata-motors-portal-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/manifest.json',
  'https://cdn.tailwindcss.com',
  'https://unpkg.com/lucide@latest/dist/umd/lucide.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Roboto:wght@300;400;500;700&display=swap',
  'https://www.tatamotors.com/wp-content/themes/TataMotors/images/Tata-Motors-logo.svg',
  'https://www.tatamotors.com/wp-content/uploads/2025/05/All-new-altroz-ember-glow-lowres.jpg',
  'https://wallpaperbat.com/img/884390-tata-motors-cars-showroom-mascot-motors-pvt-ltd-on-x-a-glimpse-of-the-beast-in-the-wild-ft-harrier-untamedkaziranga-edition-for-any-query-contact-us-91-9639008800-70-71-aligarh-91.jpg',
  'https://cars.tatamotors.com.mu/images/brandbanners/Nexon_banner_2025.webp',
  'https://www.tatamotors.com/wp-content/uploads/2024/07/1-Front-Image-With-Branding-Curvv-Ice-1.jpg',
  'https://images5.alphacoders.com/123/thumbbig-1236548.webp',
  'https://images.carandbike.com/cms/articles/2024/6/3213579/Tata_Tiago_i_CNG_34_82b98cd302.jpg',
  'https://cars.tatamotors.bt/images/brandbanners/safari-new-banner.webp'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files...');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Files cached successfully');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Error caching files:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activated successfully');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  console.log('Service Worker: Fetching:', event.request.url);
  
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          console.log('Service Worker: Serving from cache:', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network:', event.request.url);
        return fetch(event.request)
          .then((response) => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response
            const responseToCache = response.clone();
            
            // Cache the fetched resource
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
                console.log('Service Worker: Cached new resource:', event.request.url);
              });
            
            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed:', error);
            
            // Return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match('/index.html');
            }
            
            return new Response('Network error occurred', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain',
              }),
            });
          });
      })
  );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  console.log('Service Worker: Background sync triggered:', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push notification handling
self.addEventListener('push', (event) => {
  console.log('Service Worker: Push notification received');
  
  const options = {
    body: event.data ? event.data.text() : 'New update from Tata Motors',
    icon: 'https://www.tatamotors.com/wp-content/themes/TataMotors/images/Tata-Motors-logo.svg',
    badge: 'https://www.tatamotors.com/wp-content/themes/TataMotors/images/Tata-Motors-logo.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: 'https://www.tatamotors.com/wp-content/themes/TataMotors/images/Tata-Motors-logo.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: 'https://www.tatamotors.com/wp-content/themes/TataMotors/images/Tata-Motors-logo.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Tata Motors', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('Service Worker: Notification clicked:', event.action);
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    console.log('Service Worker: Performing background sync...');
    
    // Here you would typically sync any offline data
    // For now, we'll just log the sync attempt
    
    // Example: Sync offline form submissions
    const offlineData = await getOfflineData();
    if (offlineData.length > 0) {
      console.log('Service Worker: Syncing offline data:', offlineData);
      // Send offline data to server
      // await syncOfflineData(offlineData);
    }
    
    console.log('Service Worker: Background sync completed');
  } catch (error) {
    console.error('Service Worker: Background sync failed:', error);
  }
}

// Get offline data from IndexedDB
async function getOfflineData() {
  // This would typically interact with IndexedDB
  // For now, return empty array
  return [];
}

// Message handling for communication with main thread
self.addEventListener('message', (event) => {
  console.log('Service Worker: Message received:', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({ version: CACHE_NAME });
  }
}); 