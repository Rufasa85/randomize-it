document.querySelector("#logout-btn").addEventListener("click", (e) => {
  fetch("/api/users/logout", {
    method: "DELETE",
  }).then((res) => {
    if (res.ok) {
      location.href = "/";
    } else {
      alert("trumpet sound");
    }
  });
});
