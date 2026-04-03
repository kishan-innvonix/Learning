import { useState } from "react";
import { urlBase64ToUint8Array } from "../utils/pushUtils";

const VAPID_PUBLIC_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY;

export const usePush = () => {
  const [loading, setLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const checkIsSubscribed = async () => {
    if (!("serviceWorker" in navigator) || !("PushManager" in window)) return;

    const registration = await navigator.serviceWorker.getRegistration();
    if (!registration) return;

    const subscription = await registration.pushManager.getSubscription();
    if (subscription) {
      setIsSubscribed(true);
    }
  };

  const subscribe = async (userId) => {
    setLoading(true);
    console.log("subscribe");
    try {
      const registration = await navigator.serviceWorker.register("/sw.js");

      const permission = await Notification.requestPermission();
      if (permission !== "granted") {
        alert("Permission denied!!!");
        setLoading(false);
        return;
      }

      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/push/subscribe/${userId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(subscription),
        },
      );

      console.log(response);

      setIsSubscribed(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const unsubscribe = async () => {
    setLoading(true);

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (!registration) return;

      const subscription = await registration.pushManager.getSubscription();
      if (!subscription) return;

      await fetch(`${import.meta.env.VITE_BASE_URL}/api/push/unsubscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(subscription, userId),
      });

      await subscription.unsubscribe();
      setIsSubscribed(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return {
    subscribe,
    unsubscribe,
    checkIsSubscribed,
    loading,
    isSubscribed,
  };
};
