import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { currentUser } from "./isSignedIn";
import anime from "animejs";

export function submitForm() {
  const getSubmitButton = document.querySelector(
    "footer .buttons .activate-review-modal"
  );
  const modal = document.querySelector(".review-modal");
  const closeButton = document.querySelector(".review-modal .close-button");

  function activateModal(opacity) {
    anime({
      targets: modal,
      opacity: [0, opacity],
      easing: "linear",
      duration: 200,
    });
    modal.style.pointerEvents = opacity === 1 ? "all" : "none";
    modal.style.visibility = opacity === 1 ? "visible" : "hidden";
  }

  // async function submitTest() {
  //   try {
  //     await setDoc(doc(db, "users", currentUser.uid), {
  //       formSubmitted: true
  //     });
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // }

  getSubmitButton.addEventListener("click", () => activateModal(1));
  closeButton.addEventListener("click", () => activateModal(0));
}
