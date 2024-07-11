// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCy143LJRNS87XoPTEd_6v-XVs9JvGEqhs",
  authDomain: "woven-woodland-388209.firebaseapp.com",
  projectId: "woven-woodland-388209",
  storageBucket: "woven-woodland-388209.appspot.com",
  messagingSenderId: "509537071303",
  appId: "1:509537071303:web:071949d2d27155d9edcee2",
  measurementId: "G-91RCB7P0LN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with AsyncStorage for persistence
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Initialize Firestore
const db = getFirestore(app);

// To apply the default browser preference instead of explicitly setting it.
// auth.useDeviceLanguage();

export { auth, db };
