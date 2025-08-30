import { initializeApp } from "firebase/app"
import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging"


const firebaseConfig = {
  apiKey: "AIzaSyCDe5XpoPivFVoZZVfoNHyNaDwnoFvk7yE",
  authDomain: "meal-x-342d6.firebaseapp.com",
  projectId: "meal-x-342d6",
  storageBucket: "meal-x-342d6.firebasestorage.app",
  messagingSenderId: "526254194689",
  appId: "1:526254194689:web:abef223c129afa1d7f4000",
  measurementId: "G-PGKYVZL1XM"
}

const VAPID_PUBLIC_KEY = "BLXsA5IrV267cpxXcYh4qdAV3MSrErCGxBOkIOyQmBYgmYhieS6M7k6gffLe-ofNlTBg5sxgpgCBRqzADPyKFP4"
console.log("Firebase Config:", firebaseConfig)
console.log("VAPID Key:", VAPID_PUBLIC_KEY)
const app = initializeApp(firebaseConfig)
let messaging = null

export const initFCM = async () => {
  console.log("Initializing FCM...")
  try {
    console.log("Checking FCM support...")
    if (!(await isSupported())) {
      console.warn("FCM not supported in this browser")
      return null
    }
    console.log("FCM is supported")
    messaging = getMessaging(app)
    console.log("Requesting notification permission...")

      const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
    console.log("Service Worker registered:", swRegistration);

    const permission = await Notification.requestPermission()
      console.log("Notification permission:", permission)
    if (permission !== "granted") {
      console.warn("Notification permission denied")
      return null
    }
    console.log("Notification permission granted")
    
    const token = await getToken(messaging, {
      vapidKey: VAPID_PUBLIC_KEY,
      serviceWorkerRegistration:swRegistration,
    })
   console.log("FCM Token:", token)
    return token
  } catch (err) {
    console.error("FCM Init Error:", err)
    return null
  }
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    if (!messaging) return
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })
