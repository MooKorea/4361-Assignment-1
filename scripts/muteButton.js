export function muteButton() {
  const muteButton = document.querySelector(".mute-button");
  const backGroundMusic = document.querySelector(".background-music");
  backGroundMusic.volume = 0.5;

  let isMuted = false;
  const handleMuteButton = () => {
    isMuted = !isMuted;
    backGroundMusic.volume = isMuted ? 0 : 0.5;
  };

  muteButton.addEventListener("click", handleMuteButton);
}
