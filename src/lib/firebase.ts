import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithRedirect,
} from "firebase/auth";
import { getDatabase, set, ref, push, child, update } from "firebase/database";
import { SetStateAction } from "react";
import { UserDataObject, WorkoutDataObject } from "../model/model";
import { GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyArNu8sadlIN9buRC1GX0wVO9Kv33fCqBk",
  authDomain: "gymjournal.co.uk",
  projectId: "workout-tracker-bd0f5",
  storageBucket: "workout-tracker-bd0f5.appspot.com",
  messagingSenderId: "466659854872",
  appId: "1:466659854872:web:4b80a82703cbd91928d16d",
  measurementId: "G-09M13PJDBQ",
  databaseURL:
    "https://workout-tracker-bd0f5-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export async function loginEmailPassword(
  email: string,
  password: string,
  callback?: (error: unknown) => void
) {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    callback && callback(error);
  }
}

export async function registerEmailPassword(
  email: string,
  password: string,
  callback?: (error: unknown) => void
) {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    callback && callback(error);
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
export const db = getDatabase(app);

export const writeUserData = (
  uid: string,
  userData: UserDataObject[],
  setIsSavingUserData: (value: SetStateAction<boolean>) => void,
  setSavedUserData: (value: SetStateAction<boolean>) => void
) => {
  if (uid !== "invalidUid") {
    setIsSavingUserData(true);
    set(ref(db, uid), userData)
      .then(() => {
        setIsSavingUserData(false);
        setSavedUserData(true);
      })
      .catch(() => {
        setIsSavingUserData(false);
        setSavedUserData(false);
      });
  }
};

export const provider = new GoogleAuthProvider();
