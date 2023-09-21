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

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");

const editForm = document.querySelector("#articles_edit_form");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});
async function getArticle(id) {
  const user = fetch("http://localhost:3000/article/" + id)
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

const title = document.querySelector("#title");
const content = document.querySelector("#content");
const keyWords = document.querySelector("#keywords");

async function renderArticles(id) {
  const article = await getArticle(id);

  title.value = article.kb_title;
  content.value = article.kb_body;
  keyWords.value = article.kb_keywords;

}

renderArticles(id);