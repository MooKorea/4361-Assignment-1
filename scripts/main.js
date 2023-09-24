import "../styles/style.scss";
import anime from "animejs";

import { muteButton } from "./muteButton.js";
muteButton();

const introVideo = document.querySelector(".intro-video");
const video = introVideo.querySelector("video");
video.load();
video.onloadeddata = () => {
  anime({
    targets: ".intro-video-src",
    opacity: 1,
    complete: () => {
      introVideo.style.backgroundColor = "";
    },
  });
};

const handleEnterSite = () => {
  video.play();
  document.querySelector(".background-music").play();
  introVideo.style.pointerEvents = "none";

  //fade video after 2 seconds
  setTimeout(() => {
    anime({
        targets: ".intro-video-src",
        opacity: 0,
      });
    document.querySelector("body").style.overflowY = "auto"
  }, 2000);
};

introVideo.addEventListener("click", handleEnterSite);
