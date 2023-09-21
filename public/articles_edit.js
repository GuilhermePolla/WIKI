async function getUser() {
  const idRes = fetch("http://localhost:3000/current_user/")
    .then((response) => {
      if (response.status === 201) {
        return response.json();
      }
      return null;
    })
    .then((data) => {
      console.log(data);
      return data;
    });

  return idRes;
}

async function getNome() {
  const user = await getUser();

  var nameElement = document.querySelector("#name");
  if (user === null) {
    window.location.href = "http://localhost:3000/";
  } else {
    nameElement.innerHTML = user.author_name;
  }
}

getNome();

var logoutButton = document.querySelector("#logout");
logoutButton.addEventListener("click", (e) => {
  e.preventDefault();
  logout();
});

async function logout() {
  const logoutRes = await fetch("http://localhost:3000/logout", {
    method: "GET",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  if (logoutRes.status === 200) {
    localStorage.removeItem("@loginWebII");
    window.location.href = "http://localhost:3000/";
  } else {
    alert("Erro ao fazer logout");
  }
}
