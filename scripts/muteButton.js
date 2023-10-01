export function muteButton() {
  const muteButton = document.querySelector(".mute-button");
  const backGroundMusic = document.querySelector(".background-music");
  if (backGroundMusic === null) return
  backGroundMusic.volume = 0.5;
  
  let isMuted = false;
  const handleMuteButton = () => {
    isMuted = !isMuted;
    isMuted ? backGroundMusic.pause() : backGroundMusic.play()
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
