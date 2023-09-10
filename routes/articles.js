const express = require("express");

const router = express.Router();

router.get("/articles_create", (req, res, next) => {
  res.sendFile("./views/articles_create.html", { root: "." });
});

router.post("/articles_create", (req, res, next) => {
  res.sendFile("./views/articles_create.html", { root: "." });
});

router.get("/articles_edit/:id", (req, res, next) => {});

router.post("/articles_edit", (req, res, next) => {});

module.exports = router;
