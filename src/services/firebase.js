// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Your web app's Firebase configuration
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
const auth = getAuth(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = () => {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log('User logged in: ', user);
      return user; // You can return user details here
    })
    .catch((error) => {
      console.error("Error signing in with Google: ", error);
      throw error;
    });
};

// Function to sign out
const logOut = () => {
  return signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out: ", error);
      throw error;
    });
};

export { signInWithGoogle, logOut, auth };
