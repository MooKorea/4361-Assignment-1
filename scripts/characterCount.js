export function characterCount(inputSelect, counterSelect) {
  const input = document.querySelector(inputSelect);
  const counter = document.querySelector(counterSelect);

  const maxlength = parseInt(input.getAttribute("maxlength"));
  counter.innerHTML = `${maxlength} / ${maxlength}`;

  function handleCounter(e) {
    const count = e.target.value.length;
    const difference = maxlength - count;
    counter.innerHTML = `${difference} / ${maxlength}`;
    if (difference / maxlength < 0.05) {
      counter.style.color = "orange";
    } else if (difference / maxlength < 0.30) {
      counter.style.color = "yellow";
    } else {
      counter.style.color = "";
    }
  }
  input.addEventListener("input", handleCounter);
}
