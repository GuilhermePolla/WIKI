function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");
console.log(id);

async function getArticle(id) {
  const article = fetch("http://localhost:3000/articles_id/" + id)
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

  return article;
}

async function renderArticle(id) {
  const articleRes = await getArticle(id);
  const articleContainer = document.querySelector("#article");
  articleContainer.innerHTML = "";
  if (article === null) {
    articleContainer.innerHTML = "Erro ao carregar o artigo com id " + id;
    return;
  }
  const articleCard = document.createElement("div");
  articleCard.classList.add("card");
  articleCard.innerHTML = `
        <div class="card-body">
          <h5 class="card-title">${articleRes.article.kb_title}</h5>
          <p class="card-text">${articleRes.article.kb_body}</p>
          <p class="card-text">${articleRes.article.kb_author_email}</p>
          <p class="card-text">${articleRes.article.kb_liked_count}</p>
        </div>
      `;
  articleContainer.appendChild(articleCard);
  return;
}

renderArticle(id);
