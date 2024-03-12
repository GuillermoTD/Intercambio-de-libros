// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBhOlQh4IwShRRHsR_m5Bhiuked1bux9w8",
  authDomain: "intercambio-de-libros-eae2e.firebaseapp.com",
  projectId: "intercambio-de-libros-eae2e",
  storageBucket: "intercambio-de-libros-eae2e.appspot.com",
  messagingSenderId: "967708970795",
  appId: "1:967708970795:web:ca2c7d5cf45f18bf1eff6e"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);

export const auth = getAuth()
export const db = getFirestore()