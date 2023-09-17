function getName() {
  const name = localStorage.getItem("@loginWebII");
  console.log(name);
  return name;
}
getName();

const url = new URL(window.location.href);
const params = new URLSearchParams(url.search);
const id = params.get("id");

async function getUser(id) {
  const user = fetch("http://localhost:3000/user/" + id)
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

async function renderUser(id) {
  const user = await getUser(id);
  const userContainer = document.querySelector("#user");
  userContainer.innerHTML = `${
    user.author_id + " - " + user.author_name + " - " + user.author_email
  }`;
  // if (article === null) {
  //   articleContainer.innerHTML = "Erro ao carregar o artigo com id " + id;
  //   return;
  // }
  // const articleCard = document.createElement("div");
  // articleCard.classList.add("card");
  // articleCard.innerHTML = `
  //       <div class="card-body">
  //         <h5 class="card-title">${article.kb_title}</h5>
  //         <p class="card-text">${article.kb_body}</p>
  //         <p class="card-text">${article.kb_author_email}</p>
  //         <p class="card-text">${article.kb_liked_count}</p>
  //       </div>
  //     `;
  // articleContainer.appendChild(articleCard);
  // return;
}

renderUser(id);
