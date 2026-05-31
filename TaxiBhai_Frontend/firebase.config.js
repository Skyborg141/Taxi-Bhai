// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATJyTAktxnuDydXfjzARSRbSKHxFC1Wgs",
  authDomain: "taximanagement-51898.firebaseapp.com",
  projectId: "taximanagement-51898",
  storageBucket: "taximanagement-51898.appspot.com",
  messagingSenderId: "390587604157",
  appId: "1:390587604157:web:5db85047edad427f9cebd4",
  measurementId: "G-MZ1ZG8VWQK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app