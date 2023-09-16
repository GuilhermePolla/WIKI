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

const author_name = document.querySelector("#author_name");
const author_user = document.querySelector("#author_user");
const author_pwd = document.querySelector("#author_pwd");
const repetirSenha = document.querySelector("#repetirSenha");
const author_email = document.querySelector("#author_email");
const author_role_admin = document.querySelector("#admin");
const author_role_user = document.querySelector("#user");
const author_status_on = document.querySelector("#on");
const author_status_off = document.querySelector("#off");

async function onSubmit() {
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
  }
  if (loginRes.status === 400) {
    const res = await loginRes.json();
    switch (res.status) {
      case "author_id":
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
