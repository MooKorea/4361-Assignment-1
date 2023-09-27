import anime from "animejs";

export function body1() {
    const slides = document.querySelectorAll(".slideshow > div")

    let mql = window.matchMedia("(max-width: 950px)")
    mql.addEventListener("change", () => {
        let xOffset = 30;
        let yOffset = 30;
        
        if (mql.matches) {
            xOffset = 0;
            yOffset = 0;
        }

        for (let i = 0; i < slides.length; i++) {
            const reverse = slides.length - i
            slides[i].style.transform = `translate(${-reverse * xOffset}px, ${reverse * yOffset}px)`
            slides[i].style.opacity = `${1.1 - reverse * 0.2}`
        }
        
    })
}