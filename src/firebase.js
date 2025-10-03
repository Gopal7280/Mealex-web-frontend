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
const app = initializeApp(firebaseConfig)
let messaging = null

export const initFCM = async () => {
  try {
    if (!(await isSupported())) {
      return null
    }
    messaging = getMessaging(app)

      const swRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");

    const permission = await Notification.requestPermission()
    if (permission !== "granted") {
      return null
    }
    
    const token = await getToken(messaging, {
      vapidKey: VAPID_PUBLIC_KEY,
      serviceWorkerRegistration:swRegistration,
    })
    return token
  } catch (err) {
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
