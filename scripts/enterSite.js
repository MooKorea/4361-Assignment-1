import anime from "animejs";
import sleep from "./sleep";

export function enterSite() {
  const introVideo = document.querySelector(".intro-video");
  if (introVideo === null) return
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
      easing: 'linear',
      duration: 300
    });
  };

  let isMuted = false;

  const handleEnterSite = async (e) => {
    document.querySelector(".intro-buttons").style.pointerEvents = "none";
    introVideo.style.backgroundColor = "";
    if (e.target.className === "with-sound button") {
      document.querySelector(".select-sound").play();
    } else {
      isMuted = true
      document.querySelector(".mute-button img").setAttribute('src' , 'Images/MuteIcon.png')
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
        easing: 'linear'
      });
      document.querySelector("body").style.overflowY = "auto";
    }, 2000);
  };

  const withSoundButton = document.querySelector(".with-sound");
  const withoutSoundButton = document.querySelector(".without-sound");
  withSoundButton.addEventListener("click", handleEnterSite);
  withoutSoundButton.addEventListener("click", handleEnterSite);

  //mute button
  const muteButton = document.querySelector(".mute-button > .button");
  const backGroundMusic = document.querySelector(".background-music");
  if (backGroundMusic === null) return
  backGroundMusic.volume = 0.5;
  
  const muteButtonIcon = document.querySelector(".mute-button img")
  const handleMuteButton = () => {
    isMuted = !isMuted;
    if (isMuted) {
      backGroundMusic.pause()
      muteButtonIcon.setAttribute('src' , 'Images/MuteIcon.png')
    } else {
      backGroundMusic.play()
      muteButtonIcon.setAttribute('src' , 'Images/SoundIcon.png')
    }
  };

  muteButton.addEventListener("click", handleMuteButton);

  //pause audio if page is not visible
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible" && !isMuted) {
      backGroundMusic.play()
    } else {
      backGroundMusic.pause()
    }
  });
}
