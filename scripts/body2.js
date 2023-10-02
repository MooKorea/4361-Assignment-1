import anime from "animejs";

export function body2() {
  const counter = document.querySelector(".visitors-counter > .count");
  const amount = parseInt(counter.innerHTML);

  const handleCounterAnimation = () => {
    anime({
      targets: counter,
      duration: 2000,
      update: function (anim) {
        counter.innerHTML = Math.round(anim.progress * 0.01 * amount);
      },
    });
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) handleCounterAnimation();
    });
  });
  observer.observe(counter);
}
