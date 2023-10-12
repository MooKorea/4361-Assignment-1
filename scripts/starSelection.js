export let percentage;

export function starSelection() {
  const selections = document.querySelectorAll(".review-modal .rating .selection-container div");
  const yellowStars = document.querySelector(".review-modal .rating .yellow-stars");
  const selectionContainer = document.querySelector(".review-modal .rating .selection-container");
  const reviewHeadingText = document.getElementById("reviewHeading");
  const reviewBodyText = document.getElementById("reviewText");

  function handleRating(number) {
    percentage = ((number + 1) / selections.length) * 100;
    yellowStars.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`;
  }

  for (let i = 0; i < selections.length; i++) {
    selections[i].addEventListener("mouseover", () => handleRating(i));
  }

  const submitButton = document.querySelector(".review-modal form .submit");
  let selected = false;
  function confirmSelection() {
    selected = !selected;
    for (let i = 0; i < selections.length; i++) {
      selections[i].style.pointerEvents = selected ? "none" : "all";
    }
    yellowStars.style.filter = selected ? "drop-shadow(0 0 5px orange)" : "none";
    submitButton.style.pointerEvents = selected ? "all" : "none";
    submitButton.style.opacity = selected ? "" : "0.4";

    switch (true) {
      case percentage >= 80:
        reviewBodyText.setAttribute("placeholder", "Say something nice!");
        reviewHeadingText.setAttribute("placeholder", "Best food ever!");
        break;
      case percentage >= 50:
        reviewBodyText.setAttribute("placeholder", "Say something");
        reviewHeadingText.setAttribute("placeholder", "Food was okay");
        break;
      case percentage >= 30:
        reviewBodyText.setAttribute("placeholder", "Give some constructive feedback");
        reviewHeadingText.setAttribute("placeholder", "Food was disappointing");
        break;
      default:
        reviewBodyText.setAttribute("placeholder", "Say something bad I guess");
        reviewHeadingText.setAttribute("placeholder", "Food was RAW");
    }
  }
  selectionContainer.addEventListener("click", confirmSelection);
}
