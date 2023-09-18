function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

async function getArticles() {
  const articles = fetch("http://localhost:3000/destaques")
    .then((response) => {
      if (response.status === 200) {
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
        <a href="/articles/?id=${article.kb_id}" class="btn btn-primary">Ler</a>
      </div>
    `;
    articlesContainer.appendChild(articleCard);
  });
}

renderArticles();
