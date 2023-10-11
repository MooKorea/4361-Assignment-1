import { getAuth, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export let currentUser;

export function isSignedIn() {
  const auth = getAuth();
  const signedInElements = document.querySelectorAll(".signed-in-el");
  const signedOutElements = document.querySelectorAll(".signed-out-el");

  onAuthStateChanged(auth, (user) => {
    if (user) {
      handleUserSignIn(user);
    } else {
      currentUser = null;
    }
    signedOutElements.forEach((e) => (e.hidden = !!user));
    signedInElements.forEach((e) => (e.hidden = !user));
  });
}

async function handleUserSignIn(user) {
  const welcomeUser = document.querySelector(".welcome-user");
  const getSubmitButton = document.querySelector(
    "footer .buttons .activate-review-modal"
  );
  const reviewThanks = document.querySelector(".review-thanks")

  currentUser = user;
  welcomeUser.innerHTML = `Welcome, ${user.displayName}!`;

  const docRef = doc(db, "users", user.uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data()
    getSubmitButton.hidden = data.formSubmitted
    reviewThanks.hidden = !data.formSubmitted
  } else {
    console.log("creating user data")
    reviewThanks.hidden = true;
    try {
      await setDoc(doc(db, "users", currentUser.uid), {
        formSubmitted: false,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
