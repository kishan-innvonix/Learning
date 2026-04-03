self.addEventListener("push", (event) => {
  const data = event.data.json();

  const title = data?.title || "Push Notification";

  const options = {
    body: data?.body || "",
    icon: data?.icon || "/favicon.ico",
    image: data?.image || "",
    tag: data?.tag || "",
    renotify: data?.renotify || false,
    vibrate: data?.vibrate || [200, 100, 200],
    actions: data?.actions || [],
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
  const data = event.notification.data;

  event.notification.close();

  if (data?.url) {
    event.waitUntil(clients.openWindow(data.url));
  }
});
