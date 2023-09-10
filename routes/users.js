const express = require("express");

const router = express.Router();

router.get("/users_create", function (req, res, next) {
  res.sendFile("./views/users_create.html", { root: "." });
});

router.post("/users_create", function (req, res, next) {});

router.get("/users_edit/:id", function (req, res, next) {
  res.sendFile("./views/users_edit.html", { root: "." });
});

router.post("/users_edit", function (req, res, next) {});

module.exports = router;
