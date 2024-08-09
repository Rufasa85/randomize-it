const setDice = [];

document.querySelector("#dice-select").addEventListener("change", (e) => {
  if (setDice.includes(parseInt(e.target.value))) {
    alert("each set can only have one copy of each die");
    document.querySelector("#dice-select").value = "";
    return;
  }
  //TODO: refetch after add a new die
  fetch(`/api/dices/${e.target.value}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      setDice.push(data.id);
      const newDieTable = document.createElement("div");
      newDieTable.setAttribute("class", "table");
      newDieTable.innerHTML = ` 
        <h2>${data.name}</h2>
        <ol>
            ${data.Faces.map((face) => {
              return ` <li>${face.value}</li>`;
            }).join("")}
        </ol>
        <button class="remove-die-btn" type="button" data-id="${
          data.id
        }">Remove from set</button>
      `;
      document.querySelector("#chosen-dice").append(newDieTable);
      document.querySelector("#dice-select").value = "";
    });
});
document.querySelector("#set-dice").addEventListener("click", (e) => {
  if (e.target.matches(".remove-die-btn")) {
    setDice.splice(
      setDice.indexOf(parseInt(e.target.getAttribute("data-id"))),
      1
    );
    e.target.parentElement.remove();
  }
});

document.querySelector("#new-die-btn").addEventListener("click", (e) => {
  document.querySelector("#new-die-form").classList.remove("hide");
  document.querySelector("#new-set-choices").classList.add("hide");
});
document.querySelector("#cancel-new-die-btn").addEventListener("click", (e) => {
  document.querySelector("#new-die-form").classList.add("hide");
  document.querySelector("#new-set-choices").classList.remove("hide");
});

document.querySelector("#die-size").addEventListener("change", (e) => {
  document.querySelector("#new-faces").innerHTML = "";
  for (let i = 0; i < parseInt(e.target.value); i++) {
    const newLabel = document.createElement("label");
    newLabel.textContent = `Face ${i + 1}:`;
    const newInput = document.createElement("input");
    newInput.setAttribute("class", "new-die-face-input");
    document
      .querySelector("#new-faces")
      .append(newLabel, newInput, document.createElement("br"));
  }
});

document.querySelector("#add-die-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const newFaces = [];
  document.querySelectorAll(".new-die-face-input").forEach((inp) => {
    newFaces.push(inp.value);
  });
  console.log("newFaces", newFaces);
  const dieObj = {
    name: document.querySelector("#die-name").value,
    size: parseInt(document.querySelector("#die-size").value),
    faces: newFaces,
    //TODO: let user chose if public
    isPublic: true,
  };
  fetch("/api/dices", {
    method: "POST",
    body: JSON.stringify(dieObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      res.json().then((data) => {
        fetch(`/api/dices/${data.id}`)
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            setDice.push(data.id);
            const newDieTable = document.createElement("div");
            newDieTable.setAttribute("class", "table");
            newDieTable.innerHTML = ` 
        <h2>${data.name}</h2>
        <ol>
            ${data.Faces.map((face) => {
              return ` <li>${face.value}</li>`;
            }).join("")}
        </ol>
        <button class="remove-die-btn" type="button" data-id="${
          data.id
        }">Remove from set</button>
      `;
            document.querySelector("#chosen-dice").append(newDieTable);
            document.querySelector("#dice-select").value = "";
            document.querySelector("#new-die-form").classList.add("hide");
            document.querySelector("#new-set-choices").classList.remove("hide");
            document.querySelector("#die-name").value = "";
            document.querySelector("#die-size").value = "";
            document.querySelector("#new-faces").innerHTML = "";
            //TODO: add to dropdown list
          });
      });
    } else {
      alert("oh no!");
    }
  });
});

document.querySelector("#add-set-btn").addEventListener("click", (e) => {
  e.preventDefault();
  const setObj = {
    name: document.querySelector("#set-name").value,
    isPublic: true,
    dice: setDice,
  };
  console.log(setObj);
  fetch("/api/sets", {
    method: "POST",
    body: JSON.stringify(setObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (res.ok) {
      location.href = "/";
    } else {
      alert("trumpet sound");
    }
  });
});
