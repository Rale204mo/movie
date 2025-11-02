// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjE_w30sh2Go3qALuF-KPuhhs7exG9Bnw",
  authDomain: "lkay-c1a5a.firebaseapp.com",
  projectId: "lkay-c1a5a",
  storageBucket: "lkay-c1a5a.firebasestorage.app",
  messagingSenderId: "613120698977",
  appId: "1:613120698977:web:79b9708626abbdc41cd820",
  measurementId: "G-D6EGQNM281"
};
export default firebaseConfig; 

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);