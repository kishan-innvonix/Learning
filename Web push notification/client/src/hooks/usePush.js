import { useState } from "react";
import { urlBase64ToUint8Array } from "../utils/pushUtils";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export const usePush = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkIsSubscribed = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;

    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      setIsSubscribed(true);
    }
  };

  const subscribe = async () => {
    // 1 -> register service worker
    // 2 -> grant permition
    // 3 -> if permited then subscribe
    // 4 -> send subscription to server
    setIsLoading(true);

    try {
      // register to service worker
      const registration = await navigator.serviceWorker.register("/sw.js");

      //   check for notification permission
      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Permission denied!!!");
        setIsLoading(false);
        return;
      }

      // subscribe to push notification
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      // save to server here
      await fetch("http://localhost:3000/api/push/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription),
      });

      setIsSubscribed(true);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const unsubscribe = async () => {
    // 1 -> get subscription
    // 2 -> send subscription to server
    // 3 -> unsubscribe

    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (subscription) {
      await subscription.unsubscribe();

      // remove from server here
      await fetch("http://localhost:3000/api/push/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ endpoint: subscription.endpoint }),
      });

      setIsSubscribed(false);
    }
  };

  return { unsubscribe, subscribe, checkIsSubscribed, isSubscribed, isLoading };
};
