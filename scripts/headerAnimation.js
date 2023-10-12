import anime from "animejs";
import { introSkip } from "./enterSite";
import sleep from "./sleep";

const menu = document.querySelector(".buttons > .menu");
const reserve = document.querySelector(".buttons > .reserve");
const hours = document.querySelector(".buttons > .hours");

export async function setheaderButtonPositions() {
  await sleep(100);
  if (introSkip) return;
  anime({
    targets: [menu, reserve, hours],
    translateX: "100vw",
    scaleX: 4,
    opacity: 1,
  });
}

export function headerAnimation() {
  anime({
    targets: [menu, reserve, hours],
    translateX: 0,
    scaleX: 1,
    opacity: 1,
    easing: "easeOutElastic(1, .6)",
    delay: anime.stagger(100),
  });
}

export function buttonEffects() {
  const buttons = document.querySelectorAll(".body1 .buttons .button");

  function handleHoverEnter(e) {
    anime({
      targets: e.target,
      scale: 1.1,
      rotate: 0,
      duration: 400,
    });
  }

  function handleHoverLeave(e) {
    anime({
      targets: e.target,
      scale: 1,
      rotate: 0,
      duration: 400,
    });
  }

  function handleClick(e) {
    anime({
      targets: e.currentTarget,
      keyframes: [
        { rotate: -10, duration: 50 },
        { rotate: 10, duration: 50  },
        { rotate: 0, duration: 50  },
      ],
      easing: "linear"
    });
  }

  buttons.forEach((e) => {
    e.addEventListener("mouseenter", handleHoverEnter);
    e.addEventListener("mouseleave", handleHoverLeave);
    e.addEventListener("click", handleClick);
  });
}
