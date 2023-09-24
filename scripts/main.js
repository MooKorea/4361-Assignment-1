import '../styles/style.scss'

import { muteButton } from './muteButton.js'
muteButton()

const introVideo = document.querySelector(".intro-video")

const handleEnterSite = () => {
    introVideo.querySelector("video").play()
    document.querySelector(".background-music").play()
    introVideo.style.pointerEvents = "none"
}

introVideo.addEventListener("click", handleEnterSite)