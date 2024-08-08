const allDice = document.querySelectorAll(".dice");
console.log("meow");
document.querySelector("#roll-btn").addEventListener("click", (e) => {
  const results = [];
  document.querySelectorAll("li").forEach((li) => {
    li.style.backgroundColor = "white";
  });

  allDice.forEach((die, i) => {
    console.log(die);
    const result =
      Math.floor(Math.random() * die.getAttribute("data-size")) + 1;
    die.querySelector("span").textContent = result;
    const resultRow = document.querySelector(
      `.table:nth-child(${i + 1}) ol :nth-child(${result})`
    );
    results.push(resultRow.textContent);
    resultRow.style.backgroundColor = "pink";
  });
  document.querySelector("#results-spot").textContent = results.join(" ");
});
