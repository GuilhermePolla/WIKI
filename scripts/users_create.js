document.addEventListener("DOMContentLoaded", () =>{
    const form = document.getElementById("users_create_form");
    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        const nome = document.getElementById("nome").value;
        const senha = document.getElementById("senha").value;
        const rSenha = document.getElementById("rSenha").value;
        const email = document.getElementById("email").value;

        const userData = {
            username,
            password,
            email,
          };


          try {
            const response = await fetch("/users_create", {
              method: "POST",
              headers: {
                "Content-Type": "application/json", // Define o tipo de conteúdo como JSON.
              },
              body: JSON.stringify(userData), // Converte o objeto em uma string JSON.
            });

            if (response.ok) {
                // Redirecione para a página de sucesso.
                window.location.href = "/users_create_success.html";
              } else {
                // Exibe uma mensagem de erro.
                alert("Ocorreu um erro ao criar o usuário.");
              }
            } catch (error) {
              console.error(error);
              alert("Erro de conexão com o servidor.");
            }
        });
    });

