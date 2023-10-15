import { collection, getDocs, query, limit, where, startAfter } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { review } from "./review";
import anime from "animejs";

const button = document.querySelector(".body4 .more-reviews");
const reviewsContainer = document.querySelector(".body4 .reviews-container");
let readAmount = 0;
let next;
let firstQuery;

export function moreReviewsButton() {
  button.addEventListener("click", () => readData());
  let col4 = window.matchMedia("(min-width: 1840px)");
  let col3 = window.matchMedia("(min-width: 1396px)");
  let col2 = window.matchMedia("(min-width: 952px)");
  async function handleColumnAmount() {
    if (col4.matches) {
      readAmount = 8;
    } else if (col3.matches) {
      readAmount = 6;
    } else if (col2.matches) {
      readAmount = 4;
    } else {
      readAmount = 2;
    }
    while (reviewsContainer.lastElementChild) {
      reviewsContainer.removeChild(reviewsContainer.lastElementChild);
    }
    firstQuery = undefined;

    readData();
  }

  col4.addEventListener("change", handleColumnAmount);
  col3.addEventListener("change", handleColumnAmount);
  col2.addEventListener("change", handleColumnAmount);
  document.onload = handleColumnAmount();
}

let containerHeightBefore = 0;
let isReading = false;
const container = document.querySelector(".body4 .reviews-container-container");
export async function readData() {
  if (isReading) return
  isReading = true;

  button.style.opacity = "0.5";
  button.style.pointerEvents = "none";
  const usersRef = collection(db, "users");
  let q;
  if (firstQuery === undefined) {
    q = query(usersRef, limit(readAmount + 1), where("formSubmitted", "==", true));
  } else {
    q = query(
      usersRef,
      limit(readAmount + 1),
      startAfter(next),
      where("formSubmitted", "==", true)
    );
  }
  const querySnapshot = await getDocs(q);

  next = querySnapshot.docs[readAmount - 1];
  if (firstQuery === undefined) firstQuery = querySnapshot.docs[0];

  for (let i = 0; i < readAmount; i++) {
    if (querySnapshot.docs[i] === undefined) break;
    review(querySnapshot.docs[i].data());
  }

  const height = container.offsetHeight;
  anime({
    targets: container,
    height: [containerHeightBefore, `${height}px`],
    duration: 1500,
    easing: "easeOutElastic(1, 1)",
    complete: () => {
      containerHeightBefore = container.offsetHeight;
      container.style.height = "auto";
      isReading = false;

      //grey out button if no more reviews exist
      if (querySnapshot.docs[readAmount] === undefined) return;
      button.style.opacity = "1";
      button.style.pointerEvents = "all";
    },
  });
}
