function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
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

var nameElement = document.querySelector("#name");
nameElement.innerHTML = getName();
