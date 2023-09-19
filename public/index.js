function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

async function getArticles() {
  const articles = fetch("http://localhost:3000/destaques")
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

  return articles;
}

async function renderArticles() {
  const articles = await getArticles();
  const articlesContainer = document.querySelector("#articles");
  articlesContainer.innerHTML = "";
  if (articles === null) {
    articlesContainer.innerHTML = "Erro ao carregar artigos";
    return;
  }
  articles.forEach((article) => {
    const articleCard = document.createElement("div");

    articleCard.classList.add("card");
    articleCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${article.kb_title}</h5>
        <p class="card-text">${article.kb_body}</p>
        <p class="card-text">${article.kb_author_email}</p>
        <p class="card-text">${article.kb_liked_count}</p>
        <a id="like${article.kb_id}" class="btn btn-primary">Curtir</a>
        <a href="/articles/?id=${article.kb_id}" class="btn btn-primary">Ler</a>
      </div>
    `;
    articleCard.querySelector("#like" + article.kb_id).onclick = () => {
      handleLike(article.kb_id);
    };
    articlesContainer.appendChild(articleCard);
  });
}

async function likeArticle(id) {
  const like = fetch("http://localhost:3000/like/" + id, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then((data) => {
    console.log(data);
    return data;
  });

  return like;
}

async function handleLike(id) {
  const like = await likeArticle(id);
  if (like === null) {
    alert("Erro ao curtir artigo.");
    return;
  }
  if (like.status === 201) {
    alert("Artigo curtido com sucesso.");
    renderArticles();
  }
  if (like.status === 400) {
    alert("Erro ao curtir artigo.");
  }
  return articles;
}

async function getArticlesBySearch() {
  const search = document.querySelector("#search").value;
  if (search === "") {
    const all = await getArticles();
    return all;
  }
  const articles = fetch("http://localhost:3000/search/" + search)
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

  return articles;
}

async function renderArticlesBySearch() {
  const articles = await getArticlesBySearch();
  const articlesContainer = document.querySelector("#articles");
  articlesContainer.innerHTML = "";
  if (articles === null) {
    articlesContainer.innerHTML = "Erro ao carregar artigos";
    return;
  }
  articles.forEach((article) => {
    const articleCard = document.createElement("div");

    articleCard.classList.add("card");
    articleCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${article.kb_title}</h5>
        <p class="card-text">${article.kb_body}</p>
        <p class="card-text">${article.kb_author_email}</p>
        <p class="card-text">${article.kb_liked_count}</p>
        <a id="like${article.kb_id}" class="btn btn-primary">Curtir</a>
        <a href="/articles/?id=${article.kb_id}" class="btn btn-primary">Ler</a>
      </div>
    `;
    articleCard.querySelector("#like" + article.kb_id).onclick = () => {
      handleLike(article.kb_id);
    };
    articlesContainer.appendChild(articleCard);
  });
}

renderArticles();
