function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

const loginForm = document.querySelector("#login_form");
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");

async function onSubmit() {
  const username = usernameInput.value;
  const password = passwordInput.value;

  const loginRes = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (loginRes.status === 201) {
    const loginResJson = await loginRes.json();
    console.log(loginResJson);
    // localStorage.setItem("@loginWebII", loginResJson.name);
    const redirect = loginResJson.status;
    window.location.href = `http://localhost:3000/${redirect}`;
  }
  if (loginRes.status === 400) {
    alert("Invalid username or password");
  }
}
