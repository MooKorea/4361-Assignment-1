import anime from "animejs";

export function seeMore() {
  const modal = document.querySelector(".user-review-modal");
  const modalContainer = document.querySelector(
    ".user-review-modal .container"
  );
  const closeButton = document.querySelector(
    ".user-review-modal .close-button"
  );

  const data = {};
  function activateModal(opacity) {
    if (opacity === 1) {
      modal.style.pointerEvents = "all";
      modal.style.visibility = "visible";
      modalContainer.querySelector(".yellow-stars").style.clipPath =
        data.rating;
      modalContainer.querySelector(".profile-picture").style.backgroundImage = data.pfp
      modalContainer.querySelectorAll(".date").forEach(e => e.innerText = data.date)
      modalContainer.querySelector(".name").innerText = data.name
      modalContainer.querySelector(".title").innerText = data.title
      modalContainer.querySelector("p").innerText = data.text
    }
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
  closeButton.addEventListener("click", () => activateModal(0));
  const reviewsContainer = document.querySelector(".body4 .container");
  reviewsContainer.addEventListener("click", (event) => {
    if (event.target.classList.value !== "see-more") return;
    //get review container
    const c = event.target.closest(".review");
    data.name = c.querySelector(".name").innerText;
    data.date = c.querySelector(".date").innerText;
    const profilePic = window.getComputedStyle(
      c.querySelector(".profile-picture")
    );
    data.pfp = profilePic.getPropertyValue("background-image");

    const rating = window.getComputedStyle(c.querySelector(".yellow-stars"));
    data.rating = rating.getPropertyValue("clip-path");
    data.text = c.querySelector("p").innerText;
    data.title = c.querySelector(".title").innerText;

    activateModal(1);
  });
}
