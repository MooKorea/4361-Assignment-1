import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { grayStars, yellowStars } from "./starsSVG";

export async function readData() {
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    handleReview(doc.data());
  });
}

const reviewsContainer = document.querySelector(".body4 .reviews-container");
function handleReview(data) {
  if (!data.formSubmitted) return;

  const textLength = data.reviewText.length
  const review = document.createElement("div");
  review.classList.add("review");
  review.innerHTML = `
    <div class="profile-picture" style="background-image:url('${data.photo}')"></div>
    <div class="name-date">
      <div class="name">${data.name}</div>
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
