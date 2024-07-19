// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth'; // Import getAuth
import { getFirestore } from 'firebase/firestore'; // Import getFirestore
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCLmAOsQKqGFZJt_IuwPrpIDssDoh04VPo",
  authDomain: "chat-6bf92.firebaseapp.com",
  databaseURL: "https://chat-6bf92-default-rtdb.firebaseio.com",
  projectId: "chat-6bf92",
  storageBucket: "chat-6bf92.appspot.com",
  messagingSenderId: "112371206302",
  appId: "1:112371206302:web:316767defe290342e0d38f",
  measurementId: "G-C5VTXQ3TD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
// export const auth = getAuth(app);
// export const db = getFirestore(app);
// Initialize Firebase

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };