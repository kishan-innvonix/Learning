// fire on new notification
self.addEventListener("push", (event) => {
  const data = event?.data ? event?.data.json() : {};

  const title = data?.title || "Notification";

  const options = {
    body: data?.body || "",
    icon: data?.icon || "/images/push.png",
    badge: data?.icon || "/images/push.png",
    data: { url: data?.url || "/" },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

// fire on notification click
self.addEventListener("notificationclick", (event) => {
  event.notification.close(); // close the notification

  //   get url if any
  const url = event?.data?.url || "/";

  event.waitUntil(clients.openWindow(url));
});
