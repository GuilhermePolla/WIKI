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
  var logout_elem = document.querySelector("#logout");
  var home_elem = document.querySelector("#home");
  var criar_user_elem = document.querySelector("#Criar_Usuarios");
  criar_user_elem.style.display = "none";

  if (user.author_level === "admin") {
    home_elem.href = "/admin";
    criar_user_elem.style.display = "block";
  }
  if (user.author_level === "user") {
    home_elem.href = "/user";
    criar_user_elem.style.display = "none";
  }
  nameElement.innerHTML = user.author_name;
  logout_elem.style.display = "block";
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

var articleForm = document.querySelector("#articles_create_form");
articles_create_form.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});

var title = document.querySelector("#title");
var content = document.querySelector("#content");
var keyWords = document.querySelector("#keywords");
var featured = document.querySelector("#featured");

var dataAtual = new Date();
var dia = dataAtual.getDate();
var mes = dataAtual.getMonth() + 1;
var ano = dataAtual.getFullYear();

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
      kb_keywords: keyWords.value,
      kb_liked_count: "0",
      kb_published: "on",
      kb_sugestion: "off",
      kb_featured: featured.checked ? "on" : "off",
      kb_author_email: "Placeholder",
      kb_published_date: `${ano}-${mes}-${dia}`,
    }),
  });

  if (articleRes.status === 201) {
    alert("Artigo criado com sucesso");
  }

  if (articleRes.status === 400) {
    alert("Arigo já existe");
  }

  if (articleRes.status === 500) {
    alert("Erro");
  }
}
async function getArticles() {
  const users = fetch("http://localhost:3000/all_articles")
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
