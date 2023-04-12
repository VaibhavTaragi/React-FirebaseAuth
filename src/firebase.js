import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAyd4USWs6BLr8SdwNwEZUPQkHRq8Jhq60",
  authDomain: "breezeaireq.firebaseapp.com",
  projectId: "breezeaireq",
  storageBucket: "breezeaireq.appspot.com",
  messagingSenderId: "642347897370",
  appId: "1:642347897370:web:a617aac66d55432d1537a3",
  measurementId: "G-0MTR4LH70W"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();

const provider = new GoogleAuthProvider();

export {app,auth,provider};