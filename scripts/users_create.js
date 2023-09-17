function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

const loginForm = document.querySelector("#users_create_form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

async function onSubmit() {
  const author_name = document.querySelector("#author_name");
  const author_user = document.querySelector("#author_user");
  const author_pwd = document.querySelector("#author_pwd");
  const repetirSenha = document.querySelector("#repetirSenha");
  const author_email = document.querySelector("#author_email");
  const author_role_admin = document.querySelector("#admin");
  const author_role_user = document.querySelector("#user");
  const author_status_on = document.querySelector("#on");
  const author_status_off = document.querySelector("#off");

  if (!author_role_admin.value && !author_role_user.value) {
    alert("Escolha um nível de usuário.");
    return;
  }
  if (!author_status_on.value && !author_status_off.value) {
    alert("Escolha um status para o usuário.");
    return;
  }
  if (author_pwd.value !== repetirSenha.value) {
    alert("Senhas não conferem");
    return;
  }

  const loginRes = await fetch("http://localhost:3000/users_create", {
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

  if (loginRes.status === 201) {
    alert("User created successfully");
    renderUsers();
  }
  if (loginRes.status === 400) {
    const res = await loginRes.json();
    switch (res.status) {
      case "author_user":
        alert("Username already exists");
        break;
      case "author_email":
        alert("Email already exists");
        break;
      default:
        alert("Error");
        break;
    }
    return;
  }
}

async function onDelete(id) {
  const loginRes = await fetch("http://localhost:3000/users_delete", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      author_id: id,
    }),
  });

  if (loginRes.status === 201) {
    alert("User deleted successfully");
    renderUsers();
  }
  if (loginRes.status === 400) {
    alert("O usuário não existe.");
    return;
  }
}

async function getUsers() {
  const users = fetch("http://localhost:3000/all_users")
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

  return users;
}

async function renderUsers() {
  const users = document.querySelector("#users");
  const usersData = await getUsers();
  users.innerHTML = "";
  if (usersData === null) {
    users.innerHTML = "Erro ao carregar users";
    return;
  }
  usersData.forEach((user) => {
    const userCard = document.createElement("div");
    userCard.classList.add("card");
    userCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${user.author_user}</h5>
        <p class="card-text">${user.author_email}</p>
        <p class="card-text">${user.author_level}</p>
        <p class="card-text">${user.author_status}</p>  
        <a href="/users/users_edit/?id=${user.author_id}" class="btn btn-primary">Edit</a>
        <button id="delete_${user.author_id}" class="btn btn-danger">Delete</button>
      </div>
    `;
    users.appendChild(userCard);
    const deleteButton = document.querySelector(`#delete_${user.author_id}`);
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      onDelete(user.author_id);
    });
  });
}

window.onpageshow = () => {
  renderUsers();
};

renderUsers();
