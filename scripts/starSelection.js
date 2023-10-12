export function starSelection() {
    const selections = document.querySelectorAll(".rating .selection-container div")
    const yellowStars = document.querySelector(".rating .yellow-stars")
    const selectionContainer = document.querySelector(".rating .selection-container")

    function handleRating(number) {
        const percentage = ((number + 1) / selections.length) * 100
        yellowStars.style.clipPath = `polygon(0 0, ${percentage}% 0, ${percentage}% 100%, 0% 100%)`
    }

    for (let i = 0; i < selections.length; i++) {
        selections[i].addEventListener("mouseover", () => handleRating(i))
    }

    let selected = false;
    function confirmSelection() {
        selected = !selected;
        for (let i = 0; i < selections.length; i++) {
            selections[i].style.pointerEvents = selected ? "none" : "all"
        }
        yellowStars.style.filter = selected ? "drop-shadow(0 0 5px orange)" : "none"
    }
    selectionContainer.addEventListener("click", confirmSelection)
}