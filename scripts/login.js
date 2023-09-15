const loginForm = document.querySelector("#login_form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});
const loginButton = document.querySelector("#login_button");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

async function onSubmit() {
  console.log(usernameInput.value);

  const username = usernameInput.value;
  const password = passwordInput.value;

  const loginRes = fetch("http://localhost:3000/login/test", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  const loginResJson = await loginRes;
  console.log(loginResJson.status);
}
