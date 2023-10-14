import anime from "animejs";
import { introSkip } from "./enterSite";
import sleep from "./sleep";

const buttons = document.querySelectorAll(".body1 .buttons .button");
let rotateAmount;
export async function setheaderButtonPositions() {
  await sleep(100);
  if (introSkip) return;

  let mql = window.matchMedia("(max-width: 700px)");
  let initialOpacity;
  const setOpacity = () => {
    initialOpacity = mql.matches ? 0 : 1;
    rotateAmount = mql.matches ? 3 : 10;
  };
  mql.addEventListener("change", setOpacity);
  document.onload = setOpacity();

  anime.set(buttons, {
    translateX: "100vw",
    scaleX: 4,
    opacity: initialOpacity,
    pointerEvents: "none",
  });
}

export function headerAnimation() {
  anime({
    targets: buttons,
    translateX: 0,
    scaleX: 1,
    opacity: 1,
    easing: "easeOutElastic(1, .6)",
    delay: anime.stagger(100),
    complete: () => {
      anime.set(buttons, {
        pointerEvents: "all",
      });
    },
  });
}

export function buttonEffects() {
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
        { rotate: -rotateAmount, duration: 50 },
        { rotate: rotateAmount, duration: 50 },
        { rotate: 0, duration: 50 },
      ],
      easing: "linear",
    });
  }

  buttons.forEach((e) => {
    e.addEventListener("mouseenter", handleHoverEnter);
    e.addEventListener("mouseleave", handleHoverLeave);
    e.addEventListener("click", handleClick);
  });
}
