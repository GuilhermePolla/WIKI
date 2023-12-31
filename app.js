const express = require("express");
const app = express();
const fs = require("fs");
const sha256 = require("js-sha256").sha256;
const session = require("express-session");
const path = require("path");

app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
    cookie: {
      sameSite: "strict",
    },
  })
);
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function authenticatorAdmin(req, res, next) {
  if (req.session.user !== undefined && req.session.user !== null) {
    if (req.session.user.author_level === "admin") {
      console.log(`Authenticated as ${req.session.user.author_user}`);
      return next();
    }
  }

  console.log("Not authenticated");
  return res.redirect("/login");
}

function authenticatorUser(req, res, next) {
  if (req.session.user !== undefined && req.session.user !== null) {
    if (
      req.session.user.author_level === "user" ||
      req.session.user.author_level === "admin"
    ) {
      console.log(`Authenticated as ${req.session.user.author_user}`);
      return next();
    }
  }

  console.log("Not authenticated");
  return res.redirect("/login");
}

app.use(express.static(path.join(__dirname, "public")));

//--------------------SESSION--------------------//

app.get("/current_user", (req, res) => {
  if (req.session.user !== undefined && req.session.user !== null) {
    return res.status(201).json({
      author_id: req.session.user.author_id,
      author_name: req.session.user.author_name,
      author_level: req.session.user.author_level,
      author_email: req.session.user.author_email,
      status: "success",
    });
  }
  return res.status(200).json({ status: "error" });
});

//--------------------INDEX--------------------//

app.get("/", function (req, res) {
  return res.sendFile("./views/index.html", { root: "." });
});

app.get("/destaques", function (req, res) {
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articlesJson = JSON.parse(data);
    const articles = articlesJson.filter((article) => {
      if (article.kb_featured === "on") {
        return article;
      }
    });
    if (articles !== undefined) {
      return res.status(201).send(articles);
    }
    return res.status(400).send("Article not found");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.get("/user_articles", function (req, res) {
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articlesJson = JSON.parse(data);
    const articles = articlesJson.filter((article) => {
      if (article.kb_author_email === req.session.user.author_email) {
        return article;
      }
    });
    if (articles !== undefined) {
      return res.status(201).send(articles);
    }
    return res.status(400).send("Article not found");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.get("/most_liked", function (req, res) {
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articlesJson = JSON.parse(data);
    const articles = articlesJson.sort((a, b) => {
      return b.kb_liked_count - a.kb_liked_count;
    });

    if (articles !== undefined) {
      if (articles.length > 10) {
        articles.slice(0, 10);
        return res.status(201).send(articles);
      }
      return res.status(201).send(articles);
    }
    return res.status(400).send("Article not found");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

app.get("/search/:text", (req, res) => {
  console.log(req.params.text);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articlesJson = JSON.parse(data);
    const tags = req.params.text.split(" ");
    const articles = articlesJson.filter((article) => {
      const articleTags = article.kb_keywords.split(" ");
      const found = tags.every((tag) => articleTags.includes(tag));

      console.log(found);
      if (found) {
        return article;
      }
    });
    if (articles !== undefined) {
      console.log(articles);
      return res.status(201).send(articles);
    }
    return res.status(400).send("Article not found");
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

//--------------------LOGIN--------------------//

app.get("/login", (req, res) => {
  return res.sendFile("./views/login.html", { root: "." });
});

app.get("/admin", authenticatorAdmin, (req, res) => {
  return res.sendFile("./views/admin.html", { root: "." });
});

app.get("/user", authenticatorUser, (req, res) => {
  return res.sendFile("./views/user.html", { root: "." });
});

app.post("/login", (req, res) => {
  console.log(req.body);
  console.log(`${req.body.username} ${req.body.password}`);

  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const user = users.find(
      (user) =>
        user.author_user === req.body.username &&
        user.author_pwd === sha256(req.body.password)
    );
    if (user !== undefined) {
      req.session.user = user;
      console.log(req.session.user);
      return res.status(201).json({
        status: req.session.user.author_level,
        id: req.session.user.author_id,
      });
    } else {
      return res.status(401).json({ status: "error" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

app.get("/logout", (req, res) => {
  req.session.user = null;
  return res.redirect("/login");
});

//--------------------USERS--------------------//

app.get("/users_create", authenticatorAdmin, (req, res) => {
  return res.sendFile("./views/users_create.html", { root: "." });
});

app.get("/users_edit", authenticatorAdmin, (req, res) => {
  return res.sendFile("./views/users_edit.html", { root: "." });
});

//mostrar user
app.get("/user/:id", (req, res, next) => {
  console.log(req.params.id);
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const user = users.find((user) => user.author_id === req.params.id);
    console.log(user);
    if (user) {
      return res.status(201).json(user);
    }
    return res.status(404).json({ status: "error" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//mostrar todos os user
app.get("/all_users", (req, res) => {
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    res.status(201).send(users);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
    return;
  }
});

//criar user
app.post("/users_create", authenticatorAdmin, (req, res) => {
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const newUser = {
      author_id: sha256(req.body.author_user),
      author_name: req.body.author_name,
      author_user: req.body.author_user,
      author_pwd: sha256(req.body.author_pwd),
      author_email: req.body.author_email,
      author_level: req.body.author_level,
      author_status: req.body.author_status,
    };
    console.log(newUser);
    if (
      users.find((user) => user.author_user === newUser.author_user) !==
      undefined
    ) {
      return res.status(400).json({ status: "author_user" });
    }
    if (
      users.find((user) => user.author_email === newUser.author_email) !==
      undefined
    ) {
      return res.status(400).json({ status: "author_email" });
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
app.post("/users_edit/:id", authenticatorAdmin, (req, res) => {
  console.log(req.params.id);
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const newUser = {
      author_id: req.params.id,
      author_name: req.body.author_name,
      author_user: req.body.author_user,
      author_pwd: sha256(req.body.author_pwd),
      author_email: req.body.author_email,
      author_level: req.body.author_level,
      author_status: req.body.author_status,
    };
    if (
      users.find((user) => user.author_id === newUser.author_id) !== undefined
    ) {
      const filteredUsers = users.filter((user) => {
        return user.author_id !== newUser.author_id;
      });

      if (
        filteredUsers.find(
          (user) => user.author_user === newUser.author_user
        ) !== undefined
      ) {
        return res.status(400).json({ status: "author_user" });
      }
      if (
        filteredUsers.find(
          (user) => user.author_email === newUser.author_email
        ) !== undefined
      ) {
        return res.status(400).json({ status: "author_email" });
      }
      filteredUsers.push(newUser);
      fs.writeFileSync("./data/users.json", JSON.stringify(filteredUsers));
      return res.status(201).json({ status: "success" });
    }
    return res.status(400).json({ status: "not_found" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//deletar users
app.delete("/users_delete", (req, res, next) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/users.json", "utf8");
    const users = JSON.parse(data);
    const exists = users.find((user) => {
      return user.author_id === req.body.author_id;
    });

    if (exists === undefined) {
      return res.status(400).json({ status: "error" });
    }

    const newData = users.map((user) => {
      if (user.author_id === req.body.author_id) {
        user.author_status = "off";
      }
      return user;
    });

    fs.writeFileSync("./data/users.json", JSON.stringify(newData));
    return res.status(201).json({ status: "success" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//--------------------ARTICLES--------------------//

app.get("/articles/", (req, res) => {
  res.sendFile("./views/articles.html", { root: "." });
});

app.get("/articles_create", authenticatorUser, (req, res) => {
  return res.sendFile("./views/articles_create.html", { root: "." });
});

app.get("/articles_edit", authenticatorUser, (req, res) => {
  return res.sendFile("./views/articles_edit.html", { root: "." });
});

//mostrar todos os articles
app.get("/all_articles", (req, res) => {
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    res.status(201).send(articles);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
    return;
  }
});

//likes
app.post("/like/:id", (req, res) => {
  console.log(req.params.id);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const article = articles.find((article) => article.kb_id === req.params.id);
    if (article) {
      article.kb_liked_count = (
        parseInt(article.kb_liked_count) + 1
      ).toString();
      fs.writeFileSync("./data/articles.json", JSON.stringify(articles));
      return res.status(201).json({ status: "success" });
    }
    return res.status(404).json({ status: "error" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: "error" });
  }
});

//mostrar artigo
app.get("/articles_id/:id", (req, res, next) => {
  console.log(req.params.id);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const article = articles.find((article) => article.kb_id === req.params.id);
    if (article) {
      return res.status(201).json({ status: "success", article: article });
    }
    res.status(404).json({ status: "error" });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
    return;
  }
});

//mostrar todos os artigos
app.get("/all_articles", (req, res) => {
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    res.status(201).send(articles);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error" });
    return;
  }
});

//criar artigo
app.post("/articles_create", (req, res) => {
  console.log(req.body);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const newArticle = {
      kb_id: sha256(req.body.kb_title + req.body.kb_author_email + Date.now()),
      ...req.body,
    };
    if (
      articles.find((article) => article.kb_id === newArticle.kb_id) !==
      undefined
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
app.post("/articles_edit/:id", (req, res, next) => {
  console.log(req.params.id);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const newArticle = {
      kb_id: req.params.id,
      kb_title: req.body.kb_title,
      kb_body: req.body.kb_body,
      kb_permalink: req.body.kb_permalink,
      kb_keywords: req.body.kb_keywords,
      kb_liked_count: req.body.kb_liked_count,
      kb_published: req.body.kb_published,
      kb_suggestion: req.body.kb_suggestion,
      kb_featured: req.body.kb_featured,
      kb_author_email: req.body.kb_author_email,
      kb_published_date: req.body.kb_published_date,
    };
    const filteredArticles = articles.filter((article) => {
      return article.kb_id !== newArticle.kb_id;
    });
    if (
      filteredArticles.find((article) => article.kb_id === newArticle.kb_id) ===
      undefined
    ) {
      filteredArticles.push(newArticle);

      fs.writeFileSync(
        "./data/articles.json",
        JSON.stringify(filteredArticles)
      );
      return res.status(201).json({ status: "success" });
    }
    return res.status(400).json({ status: "error" });
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
