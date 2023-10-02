import anime from "animejs";

const menu = document.querySelector(".buttons > .menu")
const reserve = document.querySelector(".buttons > .reserve")
const hours = document.querySelector(".buttons > .hours")

export function setheaderButtonPositions() {
    anime({
        targets: [menu, reserve, hours],
        translateX: '100vw',
        scaleX: 4,
        opacity: 1
    })
}

export function headerAnimation() {
    anime({
        targets: [menu, reserve, hours],
        translateX: 0,
        scaleX: 1,
        opacity: 1,
        easing: 'easeOutElastic(1, .6)',
        delay: anime.stagger(100)
    })
}