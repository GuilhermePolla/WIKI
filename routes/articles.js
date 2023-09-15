const express = require("express");
const fs = require("fs");

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    res.status(200).send(articles);
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
    return;
  }
});

router.get("/articles_create", (req, res, next) => {
  res.sendFile("./views/articles_create.html", { root: "." });
});

router.post("/articles_edit", (req, res, next) => {});

router.get("/:id", (req, res, next) => {
  console.log(req.params.id);
  try {
    const data = fs.readFileSync("./data/articles.json", "utf8");
    const articles = JSON.parse(data);
    const article = articles.find((article) => article.kb_id === req.params.id);
    if (article) {
      res.status(200).send(article);
      return;
    }
    res.status(404).send("Article not found");
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
    return;
  }
});

router.post("/articles_create", (req, res, next) => {
  res.sendFile("./views/articles_create.html", { root: "." });
});

router.get("/articles_edit/:id", (req, res, next) => {});

module.exports = router;
