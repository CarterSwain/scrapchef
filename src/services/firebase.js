// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import axios from 'axios';  // Import axios to make HTTP requests

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
const auth = getAuth(app);

// Set up Google Auth Provider
const provider = new GoogleAuthProvider();

// Function to sign in with Google
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // After successful login, send user data to your backend API
    await axios.post('http://localhost:4000/api/users', {
      email: user.email,
      name: user.displayName,
      image: user.photoURL,
      uid: user.uid,
    });

    console.log('User logged in and data saved:', user);
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error.message);
    throw error; // Rethrow error to be handled by the calling function
  }
};

// Function to sign out
const logOut = () => {
  return signOut(auth)
    .then(() => {
      console.log("User signed out");
    })
    .catch((error) => {
      console.error("Error signing out:", error.message);
      throw error;
    });
};

export { signInWithGoogle, logOut, auth };
