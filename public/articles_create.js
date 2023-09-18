function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

const loginButton = document.querySelector("#logout");
loginButton.addEventListener("click", (e) => {
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

const articleForm = document.querySelector("#articles_create_form");
articles_create_form.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

const title = document.querySelector("#title");
const content = document.querySelector("#content");
const keyWords = document.querySelector("#keywords");

const dataAtual = new Date();
const dia = dataAtual.getDate();
const mes = dataAtual.getMonth() + 1;
const ano = dataAtual.getFullYear();

async function onSubmit() {
  console.log("test");
  const articleRes = await fetch("http://localhost:3000/articles_create", {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      kb_title: title.value,
      kb_body: content.value,
      kb_permalink: title.value,
      kb_keywords: title.keyWords,
      kb_liked_count: "0",
      kb_published: "on",
      kb_sugestion: "off",
      kb_featured: "off",
      kb_author_email: "Placeholder",
      kb_published_date: `${ano}-${mes}-${dia}`,
    }),
  });

  if (articleRes.status === 201) {
    alert("User created successfully");
  }

  if (articleRes.status === 400) {
    alert("Arigo já existe");
  }

  if (articleRes.status === 500) {
    alert("Erro");
  }
}
