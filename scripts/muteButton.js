export function muteButton() {
  const muteButton = document.querySelector(".mute-button");
  const backGroundMusic = document.querySelector(".background-music");
  backGroundMusic.volume = 0.5;
  
  let isMuted = false;
  const handleMuteButton = () => {
    isMuted = !isMuted;
    isMuted ? backGroundMusic.pause() : backGroundMusic.play()
  };

  muteButton.addEventListener("click", handleMuteButton);
}
