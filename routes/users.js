const express = require("express");
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get("/users_create", function (req, res, next) {
  res.sendFile("./views/users_create.html", { root: "." });
});

router.post("/users_create", function (req, res, next) {
  const { nome, senha, repetirSenha, email } = req.body;
  console.log("Dados Recebidos", { nome, senha, repetirSenha, email });
  
  if (senha === repetirSenha) {
    console.log("As senha foi repetida corretamente");
    
    const caminhoArquivo = './data/users.json';

    fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        res.status(500).send('Erro ao ler o arquivo JSON.');
        return;
      }

      let conteudoJSON = {};
      if (data) {
        conteudoJSON = JSON.parse(data);
      }

      conteudoJSON.usuarios = conteudoJSON.usuarios || [];
      conteudoJSON.usuarios.push({ nome, senha, email });

      const jsonAtualizado = JSON.stringify(conteudoJSON, null, 2);

      fs.writeFile(caminhoArquivo, jsonAtualizado, 'utf8', (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erro ao escrever no arquivo JSON.');
          return;
        }
        res.send('Dados adicionados com sucesso ao arquivo JSON.');
      });
    });
  }
});



router.get("/users_edit/:id", function (req, res, next) {
  res.sendFile("./views/users_edit.html", { root: "." });
});

router.post("/users_edit", function (req, res, next) {});

module.exports = router;
