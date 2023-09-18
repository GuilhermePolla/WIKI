function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
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

const nameElement = document.querySelector("#name");
nameElement.innerHTML = getName();

async function getArticles() {
  const articles = fetch("http://localhost:3000/all_articles")
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

async function onDelete(id) {
  const loginRes = await fetch("http://localhost:3000/articles_delete", {
    method: "DELETE",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify({
      kb_id: id,
    }),
  });

  if (loginRes.status === 201) {
    alert("Article deleted successfully");
    renderArticles();
  }
  if (loginRes.status === 400) {
    alert("O article não existe.");
    return;
  }
}

async function renderArticles() {
  const articles = document.querySelector("#articles");
  const articlesData = await getArticles();
  articles.innerHTML = "";
  if (articlesData === null) {
    articles.innerHTML = "Erro ao carregar articles";
    return;
  }
  articlesData.forEach((article) => {
    const articleCard = document.createElement("div");
    articleCard.classList.add("card");
    articleCard.innerHTML = `
      <div class="card-body">
        <h5 class="card-title">${article.kb_title}</h5>
        <p class="card-text">${article.kb_body}</p>
        <p class="card-text">${article.kb_keywords}</p>
        <p class="card-text">${article.kb_liked_count}</p>  
        <a href="/articles_edit/?id=${article.kb_id}" class="btn btn-primary">Edit</a>
        <button id="delete_${article.kb_id}" class="btn btn-danger">Delete</button>
      </div>
    `;
    articles.appendChild(articleCard);
    const deleteButton = document.querySelector(`#delete_${article.kb_id}`);
    deleteButton.addEventListener("click", (e) => {
      e.preventDefault();
      onDelete(article.kb_id);
    });
  });
}

window.onpageshow = () => {
  renderArticles();
};