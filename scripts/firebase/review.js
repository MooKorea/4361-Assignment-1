import { grayStars, yellowStars } from "./starsSVG";

const reviewsContainer = document.querySelector(".body4 .reviews-container");
export function review(data) {
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
        <div class="date">${data.date}</div>
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