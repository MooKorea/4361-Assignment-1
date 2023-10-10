import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAna_PDDu-Pe4Ciyo4zWdIuwjI8Q4-gONc",
  authDomain: "visitbaratie.firebaseapp.com",
  projectId: "visitbaratie",
  storageBucket: "visitbaratie.appspot.com",
  messagingSenderId: "395386304098",
  appId: "1:395386304098:web:f70ffdfa9ffb58df0f033b",
  measurementId: "G-BCHZDSX71X"
};

const config = {};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
