async function getArticles() {
  const articles = fetch("http://localhost:3000/articles")
    .then((response) => response.json())
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
  articles.forEach((article) => {
    const articleCard = document.createElement("div");
    articleCard.classList.add("card");
    articleCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${article.kb_title}</h5>
        <p class="card-text">${article.kb_body}</p>
        <a href="/articles/${article.kb_id}" class="btn btn-primary">Ler</a>
      </div>
    `;
    articlesContainer.appendChild(articleCard);
  });
}

renderArticles();
