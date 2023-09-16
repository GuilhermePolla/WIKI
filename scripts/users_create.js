function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

const loginForm = document.querySelector("#cadastrar");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

const author_name = document.querySelector("#author_name");
// const author_user = document.querySelector("#author_user");
// const author_pwd = document.querySelector("#author_pwd");
// const repetirSenha = document.querySelector("#repetirSenha");
// const author_email = document.querySelector("#author_email");
// const author_role_admin = document.querySelector("#admin");
// const author_role_user = document.querySelector("#user");
// const author_status_on = document.querySelector("#on");
// const author_status_off = document.querySelector("#off");

async function onSubmit() {
  console.log({
    author_name: author_name.value,
    // author_user: author_user.value,
    // author_pwd: author_pwd.value,
    // repetirSenha: repetirSenha.value,
    // author_email: author_email.value,
    // author_role_admin: author_role_admin.value,
    // author_role_user: author_role_user.value,
    // author_status_on: author_status_on.value,
    // author_status_off: author_status_off.value,
  });

  //   const loginRes = await fetch("http://localhost:3000/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-type": "application/json; charset=UTF-8",
  //     },
  //     body: JSON.stringify({
  //       author_name: author_name.value,
  //       author_user: author_user.value,
  //       author_pwd: author_pwd.value,
  //       author_email: author_email.value,
  //       author_level: author_level.value,
  //       author_status: author_status.value,
  //     }),
  //   });

  //   if (loginRes.status === 201) {
  //     const loginResJson = await loginRes.json();
  //     console.log(loginResJson);
  //     switch (loginResJson.role) {
  //       case "admin":
  //         // fetch("http://localhost:3000/login/admin");
  //         localStorage.setItem("@loginWebII", "admin");
  //         window.location.href = "http://localhost:3000/login/admin";
  //         break;
  //       case "user":
  //         // fetch("http://localhost:3000/login/user");
  //         localStorage.setItem("@loginWebII", "user");
  //         window.location.href = "http://localhost:3000/login/user";
  //         break;
  //     }
  //   }
  //   if (loginRes.status === 400) {
  //     alert("Invalid username or password");
  //   }
}
