import { initializeApp, getApps, getApp } from "firebase/app"
import { initializeAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// import { AsyncStorage } from '@react-native-async-storage/async-storage'

const firebaseConfig = {
  apiKey: "AIzaSyAoe8JcGm-UnjFxC5MUeADJJk1XaVwxAWU",
  authDomain: "contacts-app-b6ce3.firebaseapp.com",
  projectId: "contacts-app-b6ce3",
  storageBucket: "contacts-app-b6ce3.firebasestorage.app",
  messagingSenderId: "864143822435",
  appId: "1:864143822435:web:ed5bafb33f78d1b0763256"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = initializeAuth(app)
const db = getFirestore(app)

export { auth, db }