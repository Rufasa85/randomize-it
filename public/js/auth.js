document.querySelector("#login-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {
    username: document.querySelector("#login-username").value,
    password: document.querySelector("#login-password").value,
  };
  fetch("/api/users/login", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      alert("oh no!");
    } else {
      res.json().then((data) => {
        location.href = `/profile/${data.id}`;
      });
    }
  });
});

document.querySelector("#signup-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const userObj = {
    username: document.querySelector("#signup-username").value,
    password: document.querySelector("#signup-password").value,
  };
  fetch("/api/users", {
    method: "POST",
    body: JSON.stringify(userObj),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    if (!res.ok) {
      alert("oh no!");
    } else {
      res.json().then((data) => {
        location.href = `/profile/${data.id}`;
      });
    }
  });
});
