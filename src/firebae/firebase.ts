import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { UserDataObject } from "../model/model";

const firebaseConfig = {
  apiKey: "AIzaSyArNu8sadlIN9buRC1GX0wVO9Kv33fCqBk",
  authDomain: "workout-tracker-bd0f5.firebaseapp.com",
  projectId: "workout-tracker-bd0f5",
  storageBucket: "workout-tracker-bd0f5.appspot.com",
  messagingSenderId: "466659854872",
  appId: "1:466659854872:web:4b80a82703cbd91928d16d",
  measurementId: "G-09M13PJDBQ",
  databaseURL:
    "https://workout-tracker-bd0f5-default-rtdb.europe-west1.firebasedatabase.app/",
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

export async function registerEmailPassword(
  email: string,
  password: string,
  name: string
) {
  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCred.user, { displayName: name });
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

// Realtime Database
const db = getDatabase(app);

function writeUserData(uid: string, userData: UserDataObject[]) {
  if (uid !== "invalidUid") {
    set(ref(db, uid), userData);
  }
}

export { auth, writeUserData, db };
