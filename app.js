const express = require("express");
const app = express();
const fs = require("fs");
const sha256 = require("js-sha256");

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// const authenticator = require("./middleware/authenticator");
// app.use(authenticator);

//--------------------ROTAS--------------------//
const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const scriptsRouter = require("./routes/scripts");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/scripts", scriptsRouter);

//--------------------INDEX--------------------//

app.get("/destaques", function (req, res) {
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articlesJson = JSON.parse(data);
    const articles = articlesJson
      .filter((article) => {
        if (article.kb_featured === "on") {
          return article;
        }
      })
      .sort((a, b) => {
        return b.kb_liked_count - a.kb_liked_count;
      });

    if (articles) {
      res.status(201).send(articles);
      return;
    }
    res.status(400).send("Article not found");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
    return;
  }
});

//--------------------LOGIN--------------------//

app.post("/login", (req, res) => {
  console.log(req.body);
  console.log(`${req.body.username} ${req.body.password}`);

  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const user = users.find(
      (user) =>
        user.author_email === req.body.username &&
        user.author_pwd === req.body.password
    );
    if (user !== undefined) {
      return res
        .status(201)
        .json({ role: user.author_level, status: "success" });
    } else {
      return res.status(401).json({ status: "error" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//--------------------USERS--------------------//

//mostrar user
app.get("/users", (req, res) => {
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    res.status(201).json({ data: users, status: "success" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
    return;
  }
});

//criar user
app.post("/users_create", (req, res) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const newUser = {
      ...req.body,
      kb_id: sha256(req.body.author_name),
    };
    if (users.find((user) => user.kb_id === newUser.kb_id) !== undefined) {
      return res.status(400).json({ status: "exists" });
    }
    users.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    return res.status(201).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//editar user
app.post("/users_edit", (req, res) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const newUser = {
      ...req.body,
    };
    if (users.find((user) => user.kb_id === newUser.kb_id) !== undefined) {
      return res.status(400).json({ status: "exists" });
    }
    users.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(users));
    return res.status(201).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//deletar users
app.delete("/users_delete/", (req, res, next) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const filteredUsers = users.filter((user) => {
      return user.author_id !== req.body.author_id;
    });
    fs.writeFileSync("./data/users.json", JSON.stringify(filteredUsers));
    return res.status(201).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//--------------------ARTICLES--------------------//

//mostrar artigo
app.get("/articles/:id", (req, res, next) => {
  console.log(req.params.id);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const article = articles.find((article) => article.kb_id === req.params.id);
    if (article) {
      res.status(201).json(article);
      return;
    }
    res.status(404).json({ status: "error" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
    return;
  }
});

//criar artigo
app.post("/articles_create", (req, res, next) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const newArticle = {
      ...req.body,
      kb_id: sha256(req.body.kb_title + req.body.kb_author_email + Date.now()),
      kb_liked_count: 0,
    };
    if (
      data.find((article) => article.kb_id === newArticle.kb_id) !== undefined
    ) {
      return res.status(400).json({ status: "exists" });
    }
    articles.push(newArticle);
    fs.writeFileSync("./data/articles.json", JSON.stringify(articles));
    return res.status(201).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//editar artigo
app.post("/articles_edit", (req, res, next) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const newArticle = {
      ...req.body,
    };
    const filteredArticles = articles.filter((article) => {
      return article.kb_id !== newArticle.kb_id;
    });
    filteredArticles.push(newArticle);
    fs.writeFileSync("./data/articles.json", JSON.stringify(filteredArticles));
    return res.status(201).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//deletar artigo
app.delete("/articles_delete/", (req, res, next) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const filteredArticles = articles.filter((article) => {
      return article.kb_id !== req.body.kb_id;
    });
    fs.writeFileSync("./data/articles.json", JSON.stringify(filteredArticles));
    return res.status(201).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//--------------------SERVER--------------------//

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
