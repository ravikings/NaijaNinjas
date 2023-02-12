// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBM5wCW5G9aXhbzCTjGuTqwhfS5W13fhUw",
  authDomain: "gigxnow-c4335.firebaseapp.com",
  projectId: "gigxnow-c4335",
  storageBucket: "gigxnow-c4335.appspot.com",
  messagingSenderId: "296351545552",
  appId: "1:296351545552:web:1a3b1abc7a400a108586d5",
  measurementId: "G-BVCSMWF93K"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const messaging = getMessaging(app);