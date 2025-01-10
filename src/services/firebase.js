// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9WyqA3IXRpBqSLrxZnOsK59F9XyeAOPE",
  authDomain: "scrapchef.firebaseapp.com",
  projectId: "scrapchef",
  storageBucket: "scrapchef.firebasestorage.app",
  messagingSenderId: "819774875962",
  appId: "1:819774875962:web:c9c5cd258eec939229c803",
  measurementId: "G-41M6D98JKT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);