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

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");

const editForm = document.querySelector("#users_edit_form");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

async function getUserId(id) {
  const user = fetch("http://localhost:3000/user/" + id)
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

  return user;
}

const author_name = document.querySelector("#author_name");
const author_user = document.querySelector("#author_user");
const author_pwd = document.querySelector("#author_pwd");
const repetirSenha = document.querySelector("#repetirSenha");
const author_email = document.querySelector("#author_email");
const author_role_admin = document.querySelector("#admin");
const author_role_user = document.querySelector("#user");
const author_status_on = document.querySelector("#on");
const author_status_off = document.querySelector("#off");

async function renderUser(id) {
  const user = await getUserId(id);

  const userContainer = document.querySelector("#user_name");

  userContainer.innerHTML = `${user.author_name}`;

  author_name.value = user.author_name;
  author_user.value = user.author_user;
  author_email.value = user.author_email;
  author_role_admin.checked = user.author_level === "admin";
  author_role_user.checked = user.author_level === "user";
  author_status_on.checked = user.author_status === "on";
  author_status_off.checked = user.author_status === "off";
}

async function onSubmit() {
  if (author_pwd.value !== repetirSenha.value) {
    alert("Passwords do not match.");
    return;
  }
  const editRes = await fetch("http://localhost:3000/users_edit/" + id, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      author_name: author_name.value,
      author_user: author_user.value,
      author_pwd: author_pwd.value,
      author_email: author_email.value,
      author_level: author_role_admin.checked
        ? author_role_admin.value
        : author_role_user.value,
      author_status: author_status_on.checked
        ? author_status_on.value
        : author_status_off.value,
    }),
  });

  if (editRes.status === 201) {
    alert("User edited successfully.");
    renderUser(id);
    return;
  }
  if (editRes.status === 400) {
    const res = await editRes.json();
    switch (res.status) {
      case "author_user":
        alert("Username already exists.");
        break;
      case "author_email":
        alert("Email already exists.");
        break;
      case "not_found":
        alert("User not found.");
        break;
      default:
        alert("Error.");
        break;
    }
    return;
  } else {
    alert("Error");
  }
}

renderUser(id);
