const express = require("express");

const router = express.Router();

router.get("/users_create", function (req, res, next) {
  res.sendFile("./views/users_create.html", { root: "." });
});

router.get("/users_edit", function (req, res, next) {
  res.sendFile("./views/users_edit.html", { root: "." });
});

router.get("/scripts/users_edit.js", (req, res, next) => {
  res.sendFile("./scripts/users_edit.js", { root: "." });
});

module.exports = router;
