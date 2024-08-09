document.querySelectorAll(".del-set-btn").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const idToDel = e.target.getAttribute("data-id");
    fetch(`/api/sets/${idToDel}`, {
      method: "DELETE",
    }).then((res) => {
      if (res.ok) {
        location.reload();
      } else {
        alert("trumpet sound");
      }
    });
  });
});
