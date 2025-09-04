

importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js")
importScripts("https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js")

firebase.initializeApp({
  apiKey: "AIzaSyCDe5XpoPivFVoZZVfoNHyNaDwnoFvk7yE",
  authDomain: "meal-x-342d6.firebaseapp.com",
  projectId: "meal-x-342d6",
  storageBucket: "meal-x-342d6.appspot.com",
  messagingSenderId: "526254194689",
  appId: "1:526254194689:web:abef223c129afa1d7f4000",
  measurementId: "G-PGKYVZL1XM"
})

const messaging = firebase.messaging()

messaging.onBackgroundMessage((payload) => {
  console.log("[firebase-messaging-sw.js] Received background message ", payload)

  const notificationTitle = payload.notification?.title || payload.data?.title || "MealX"
  const notificationOptions = {
    body: payload.notification?.body || payload.data?.body || "",
    icon: "/mealx.png",
    badge: "/badge.png", 
    data: payload.data || {}
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})



// Handle click
self.addEventListener("notificationclick", (event) => {
  event.notification.close()
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus()
      }
      if (event.notification.data?.url) {
        return clients.openWindow(event.notification.data.url)
      } else {
        return clients.openWindow("/")
      }
    })
  )
}) 