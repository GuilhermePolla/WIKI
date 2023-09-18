const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");

async function getArticle(id) {
  const article = await fetch("http://localhost:3000/articles/" + id)
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

  return article;
}

async function renderArticle(id) {
  const articles = await getArticle(id);
  const articleContainer = document.querySelector("#article");

  if (articles === null) {
    articleContainer.innerHTML = "Erro ao carregar o artigo com id " + id;
    return;
  }

  articles.forEach((article) => {
    articleContainer.innerHTML += `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${article.kb_title}</h5>
          <p class="card-text">${article.kb_body}</p>
          <p class="card-text">${article.kb_author_email}</p>
          <p class="card-text">${article.kb_liked_count}</p>
        </div>
      </div>
    `;
  });
}

renderArticle(id);