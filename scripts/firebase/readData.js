import { collection, getDocs, query, limit, where, startAfter } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { grayStars, yellowStars } from "./starsSVG";

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
  function handleColumnAmount() {
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

export async function readData() {
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
    handleReview(querySnapshot.docs[i].data());
  }
  
  //grey out button if no more reviews exist
  if (querySnapshot.docs[readAmount] === undefined) {
    button.style.opacity = "0.5";
    button.style.pointerEvents = "none";
  } else {
    button.style.opacity = "1";
    button.style.pointerEvents = "all";
  }
}

function handleReview(data) {
  const textLength = data.reviewText.length;
  let nameSize = "1.2rem";
  if (data.name.length > 16) nameSize = "0.8rem";

  const review = document.createElement("div");
  review.classList.add("review");
  review.innerHTML = `
    <div class="profile-picture" style="background-image:url('${data.photo}')"></div>
    <div class="name-date">
      <div class="name" style="font-size:${nameSize};">
        ${data.name}
      </div>
      <div class="date">${data.date}</div>
    </div>
    <div class="rating">
      <svg
        class="gray-stars"
        viewBox="0 0 174 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ${grayStars}
      </svg>
      <svg
        class="yellow-stars"
        viewBox="0 0 174 27"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style="clip-path:polygon(0 0, ${data.rating}% 0, ${data.rating}% 100%, 0% 100%)"
      >
        ${yellowStars}
      </svg>
    </div>
    <div class="body">
      <div class="title">${data.reviewHeading}</div>
      <p>
        ${data.reviewText}
      </p>
    </div>
    <div class="see-more" style="visibility:${textLength > 100 ? "" : "hidden"}">
      See More
    </div>
    `;

  reviewsContainer.appendChild(review);
}
