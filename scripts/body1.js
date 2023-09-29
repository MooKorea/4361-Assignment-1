import anime from "animejs";

export function body1() {
  const slides = document.querySelectorAll(".slideshow > div");

  let mql = window.matchMedia("(max-width: 950px)");
  let xOffset, yOffset;

  function handleMediaQuery() {
    if (mql.matches) {
      xOffset = 0;
      yOffset = 0;
      setSlideStyle();
    } else {
      xOffset = 50;
      yOffset = 30;
      setSlideStyle();
    }
  }

  function setSlideStyle() {
    for (let i = 0; i < slides.length; i++) {
      const reverse = slides.length - i;
      slides[i].style.transform = `translateX(${-reverse * xOffset}px) translateY(${
        reverse * yOffset
      }px)`;
      slides[i].style.zIndex = i;
      slides[i].style.opacity = `${i / (slides.length - 1)}`;
    }
  }

  setTimeout(() => {
    handleAnimation();
  }, 1000);

  mql.addEventListener("change", handleMediaQuery);
  document.onload = handleMediaQuery();

  function handleAnimation() {
    anime({
      targets: ".body1 .slideshow > div",
      translateX: [
        {
          value: function (el, i, l) {
            const zIndex = parseInt(anime.get(el, "z-index"));
            return (zIndex - l + 1) * xOffset;
          },
        },
        {
          value: function (el, i, l) {
            const zIndex = parseInt(anime.get(el, "z-index"));
            if (zIndex === l - 1) {
              return -l * xOffset;
            } else {
              return "+=0";
            }
          },
        },
      ],
      translateY: [
        {
          value: function (el, i, l) {
            const zIndex = parseInt(anime.get(el, "z-index"));
            return -(zIndex - l + 1) * yOffset;
          },
        },
        {
          value: function (el, i, l) {
            const zIndex = parseInt(anime.get(el, "z-index"));
            if (zIndex === l - 1) {
              return l * yOffset;
            } else {
              return "+=0";
            }
          },
        },
      ],
      opacity: {
        value: function (el, i, l) {
          const zIndex = parseInt(anime.get(el, "z-index"));
          if (zIndex === l - 1) {
            return 0;
          } else {
            return `+=${1 / (l - 1)}`;
          }
        },
        easing: "linear",
        duration: 300,
      },
      zIndex: {
        value: function (el, i, l) {
          const zIndex = parseInt(anime.get(el, "z-index"));
          if (zIndex === l - 1) {
            return 0;
          } else {
            return `+=1`;
          }
        },
      },
      duration: 1500,
      delay: 2000,
      complete: () => {
        handleAnimation();
      },
    });
  }
}
