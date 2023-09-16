const express = require("express");

const router = express.Router();

router.get("/index.js", (req, res, next) => {
  res.sendFile("./scripts/index.js", { root: "." });
});

router.get("/admin.js", (req, res, next) => {
  res.sendFile("./scripts/admin.js", { root: "." });
});

router.get("/user.js", (req, res, next) => {
  res.sendFile("./scripts/user.js", { root: "." });
});

router.get("/articles.js", (req, res, next) => {
  res.sendFile("./scripts/articles.js", { root: "." });
});

router.get("/articles_create.js", (req, res, next) => {
  res.sendFile("./scripts/articles_create.js", { root: "." });
});

router.get("/articles_edit.js", (req, res, next) => {
  res.sendFile("./scripts/articles_edit.js", { root: "." });
});

router.get("/login.js", (req, res, next) => {
  res.sendFile("./scripts/login.js", { root: "." });
});

router.get("/users_create.js", (req, res, next) => {
  res.sendFile("./scripts/users_create.js", { root: "." });
});

router.get("/users_edit.js", (req, res, next) => {
  res.sendFile("./scripts/users_edit.js", { root: "." });
});

module.exports = router;
