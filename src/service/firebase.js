import { initializeApp } from "firebase/app";
import { getFirestore,  doc, getDocs, collection, addDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTEqeNRWTN0X8Qvhi-EbdbkVUoyE51b6c",
  authDomain: "simple-e-comerce.firebaseapp.com",
  projectId: "simple-e-comerce",
  storageBucket: "simple-e-comerce.appspot.com",
  messagingSenderId: "875355033648",
  appId: "1:875355033648:web:28406b6cf610a948cb9df5",
  measurementId: "G-CNWCE1CHD9",
};

initializeApp(firebaseConfig);

const db = getFirestore();
const auth = getAuth();

export {
  auth,
  doc,
  addDoc,
  getDocs,
  collection,
  createUserWithEmailAndPassword,
  updateProfile,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  db,
};
