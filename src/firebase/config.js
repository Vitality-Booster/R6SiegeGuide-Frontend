import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCXIRdhpv9pw5kPujBJewPzkJm44iqjfSg",
    authDomain: "r6siege-guide.firebaseapp.com",
    projectId: "r6siege-guide",
    storageBucket: "r6siege-guide.appspot.com",
    messagingSenderId: "272522559720",
    appId: "1:272522559720:web:e3ed7658d8ad279a55895d",
    measurementId: "G-C5K9M28S5N"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
initializeApp(firebaseConfig);

const auth = getAuth()

export { auth }