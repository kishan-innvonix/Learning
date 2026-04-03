/*
check if subscribed -> based on this show button 

mainly three functions one for subscribe another for unsubscribe and one for checking is subscribed or not

*/

import { useEffect } from "react";
import { usePush } from "./hooks/usePush";

const PushNotification = () => {
  const { checkIsSubscribed, isLoading, isSubscribed, subscribe, unsubscribe } =
    usePush();

  useEffect(() => {
    checkIsSubscribed();
  }, []);

  return (
    <>
      {isSubscribed ? (
        <button onClick={unsubscribe} disabled={isLoading}>
          Unsubscribe
        </button>
      ) : (
        <button onClick={subscribe} disabled={isLoading}>
          {isLoading ? "Subscribing..." : "Subscribe"}
        </button>
      )}
    </>
  );
};

export default PushNotification;
