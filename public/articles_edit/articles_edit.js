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
console.log("id na url: ", id);

const editForm = document.querySelector("#articles_edit_form");
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit();
});
async function getArticle(id) {
  console.log("id dentro do getArticle: ", id);
  const user = fetch("http://localhost:3000/articles_id/" + id)
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

var subButton = document.querySelector("#cadastrar_button");
subButton.addEventListener("submit", (e) => {
  e.preventDefault();
  onSubmit(id);
});

const title = document.querySelector("#title");
const content = document.querySelector("#content");
const keyWords = document.querySelector("#keywords");
const featured = document.querySelector("#featured");
const notFeatured = document.querySelector("#not_featured");

async function renderArticles(id) {
  const article = await getArticle(id);

  title.value = article.article.kb_title;
  content.value = article.article.kb_body;
  keyWords.value = article.article.kb_keywords;
  featured.checked = article.article.kb_featured === "on";
  notFeatured.checked = article.article.kb_featured === "off";
}

async function onSubmit() {
  const article = await getArticle(id);
  const editRes = await fetch("http://localhost:3000/articles_edit/" + id, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      kb_title: title.value,
      kb_body: content.value,
      kb_keywords: keyWords.value,
      kb_featured: featured.checked ? "on" : "off",
      kb_id: article.article.kb_id,
      kb_permalink: article.article.kb_permalink,
      kb_liked_count: article.article.kb_liked_count,
      kb_published: article.article.kb_published,
      kb_suggestion: article.article.kb_suggestion,
      kb_author_email: article.article.kb_author_email,
      kb_published_date: article.article.kb_published_date,
    }),
  });
}

renderArticles(id);
