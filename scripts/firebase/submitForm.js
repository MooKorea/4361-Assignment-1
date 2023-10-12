import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { currentUser } from "./isSignedIn";
import anime from "animejs";
import { percentage } from "../starSelection";
import sleep from "../sleep";

export function submitForm() {
  const activateFormButton = document.querySelector(
    "footer .buttons .activate-review-modal"
  );
  const modal = document.querySelector(".review-modal");
  const closeButton = document.querySelector(".review-modal .close-button");
  const modalContainer = document.querySelector(".review-modal .container");
  const userName = document.querySelector(".review-modal .username");
  const userEmail = document.querySelector(".review-modal .email div");
  const profilPic = document.querySelector(".review-modal .profile-picture");

  function activateModal(opacity) {
    if (opacity === 1) {
      modal.style.pointerEvents = "all";
      modal.style.visibility = "visible";
    }
    userName.innerHTML = currentUser.displayName;
    userEmail.innerHTML = currentUser.email;
    profilPic.style.backgroundImage = `url(${currentUser.photoURL})`;
    const initial = opacity === 1 ? 0 : 1;

    anime({
      targets: modalContainer,
      translateX: opacity === 1 ? ["100vw", 0] : "-100vw",
      easing: opacity === 1 ? "easeOutElastic(1, .6)" : "easeInElastic(10, 1)",
      duration: opacity === 1 ? 800 : 500,
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

  const form = document.querySelector(".review-modal form");
  async function getFormData(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const parsedData = Object.fromEntries(data.entries());
    parsedData.rating = percentage;
    parsedData.formSubmitted = true;
    parsedData.photo = currentUser.photoURL;
    parsedData.name = currentUser.displayName;

    const date = new Date();
    parsedData.date = date.toLocaleDateString();

    form.style.pointerEvents = "none";
    document.querySelector(".review-modal form .submit").style.opacity = "0.4";
    document.querySelector(".review-thanks").style.display = "";
    document.querySelector("footer .buttons .activate-review-modal").style.display =
      "none";
    try {
      await setDoc(doc(db, "users", currentUser.uid), parsedData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    await sleep(300);
    activateModal(0);
  }

  form.addEventListener("submit", getFormData);

  activateFormButton.addEventListener("click", () => activateModal(1));
  closeButton.addEventListener("click", () => activateModal(0));
}
