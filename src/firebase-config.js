// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL,listAll,uploadBytesResumable ,getMetadata ,deleteObject} from 'firebase/storage';
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

const app = initializeApp(firebaseConfig);


const storage = getStorage(app);
export { storage, ref, uploadBytes, getDownloadURL,listAll ,uploadBytesResumable,getMetadata ,deleteObject};