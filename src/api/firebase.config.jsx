import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAC38bRJYh3Y-FZr6uEn-BU30bYbQq84O0",
  authDomain: "storage-69873.firebaseapp.com",
  projectId: "storage-69873",
  storageBucket: "storage-69873.appspot.com",
  messagingSenderId: "155631760625",
  appId: "1:155631760625:web:09961e6a8a0150bbee2550"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

export const db = app.firestore();