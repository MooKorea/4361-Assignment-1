import anime from "animejs";
import sleep from "./sleep";

export function enterSite() {
  const introVideo = document.querySelector(".intro-video");
  const video = introVideo.querySelector("video");

  video.load();
  video.onloadeddata = () => {
    anime({
      targets: ".intro-buttons > .button",
      translateY: [100, 0],
      delay: anime.stagger(70),
    });

    anime({
      targets: ".fade-in",
      opacity: 1,
      complete: () => {
        introVideo.style.backgroundColor = "";
      },
    });
  };

  const handleEnterSite = async (e) => {
    document.querySelector(".intro-buttons").style.pointerEvents = "none";
    if (e.target.className === "with-sound button") {
      document.querySelector(".select-sound").play();
    }
    anime({
      targets: ".with-sound",
      translateX: "-100vw",
      easing: "easeInElastic(10, 1)",
      duration: 700,
    });

    anime({
      targets: ".without-sound",
      translateX: "100vw",
      easing: "easeInElastic(10, 1)",
      duration: 700,
    });

    await sleep(600);

    if (e.target.className === "with-sound button") {
      document.querySelector(".background-music").play();
    }
    video.play();
    introVideo.style.pointerEvents = "none";

    //fade video after 2 seconds
    setTimeout(() => {
      anime({
        targets: ".intro-video-src",
        opacity: 0,
      });
      document.querySelector("body").style.overflowY = "auto";
    }, 2000);
  };

  const withSoundButton = document.querySelector(".with-sound");
  const withoutSoundButton = document.querySelector(".without-sound");
  withSoundButton.addEventListener("click", handleEnterSite);
  withoutSoundButton.addEventListener("click", handleEnterSite);
}
