import anime from "animejs";

export function menuButtons() {
  const buttonText = document.querySelectorAll(".body1 .buttons .label");
  buttonText.forEach((e) => {
    const text = e.innerText;
    const lettersArr = text.split(" ").map((e) => {
      return `<span>${e}</span>`;
    });
    e.innerHTML = lettersArr.join(" ")
    console.log(lettersArr.join(" "))
  });
}
