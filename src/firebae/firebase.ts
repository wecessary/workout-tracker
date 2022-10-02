import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArNu8sadlIN9buRC1GX0wVO9Kv33fCqBk",
  authDomain: "workout-tracker-bd0f5.firebaseapp.com",
  projectId: "workout-tracker-bd0f5",
  storageBucket: "workout-tracker-bd0f5.appspot.com",
  messagingSenderId: "466659854872",
  appId: "1:466659854872:web:4b80a82703cbd91928d16d",
  measurementId: "G-09M13PJDBQ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function loginEmailPassword(email: string, password: string) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert(`There was an error: ${error}`);
  }
}

export function logOut() {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
}

export { auth };
