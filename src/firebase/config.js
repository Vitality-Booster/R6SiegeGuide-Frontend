import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";


console.log("process.env: " + process.env.VUE_APP_FIREBASE_API_KEY)
console.log("process.env: " + process.env.VUE_APP_BASE_URL)
console.log("process.env authDomain: " + process.env.VUE_APP_FIREBASE_AUTH_DOMAIN)
console.log("process.env projectId: " + process.env.VUE_APP_FIREBASE_PROJECT_ID)

const firebaseConfig = {
    apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
    authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.VUE_APP_FIREBASE_APP_ID
}

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth()
const storage = getStorage()

export { auth, storage }