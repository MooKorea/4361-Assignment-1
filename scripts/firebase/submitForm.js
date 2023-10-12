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
  const modalContainer = document.querySelector(".review-modal .container");

  function activateModal(opacity) {
    if (opacity === 1) {
      modal.style.pointerEvents = "all";
      modal.style.visibility = "visible";
    }

    const initial = opacity === 1 ? 0 : 1;

    anime({
      targets: modalContainer,
      translateX: opacity === 1 ? ["100vw", 0] : "-100vw",
      easing: opacity === 1 ? "easeOutElastic(1, .6)" : "easeInElastic(10, 1)",
      duration: opacity === 1 ? 800 : 500
    });

    anime({
      targets: modal,
      opacity: [initial, opacity],
      easing: "linear",
      duration: 200,
      delay: opacity === 1 ? 0 : 300,
      complete: function (anim) {
        if (opacity === 1) return;
        modal.style.pointerEvents = "none";
        modal.style.visibility = "hidden";
      },
    });
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
