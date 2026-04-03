import React from "react";
import PushNotification from "./PushNotification";

const App = () => {
  const sendNotification = async () => {
    await fetch("http://localhost:3000/api/push/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "Notification",
        body: "Notification",
        url: "/",
        icon: "/images/push.png",
      }),
    });
  };

  return (
    <div>
      <PushNotification />

      <button onClick={sendNotification}>Send Notification</button>
    </div>
  );
};

export default App;
