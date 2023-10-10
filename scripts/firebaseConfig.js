import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKsTDUYMtApskYd-cZWgzd0vIz71pXUTA",
  authDomain: "eat-at-baratie.firebaseapp.com",
  projectId: "eat-at-baratie",
  storageBucket: "eat-at-baratie.appspot.com",
  messagingSenderId: "369065987076",
  appId: "1:369065987076:web:27edf5bf330c98fd2f3951",
  measurementId: "G-78K81L3DME",
};

const config = {};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
