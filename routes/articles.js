const express = require("express");

const router = express.Router();

router.get("/articles_create", (req, res, next) => {
  res.sendFile("./views/articles_create.html", { root: "." });
});

router.get("/articles_edit", (req, res, next) => {
  res.sendFile("./views/articles_edit.html", { root: "." });
});

router.get("/", (req, res, next) => {
  res.sendFile("./views/articles.html", { root: "." });
});

module.exports = router;
