const express = require("express");
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get("/users_create", function (req, res, next) {
  res.sendFile("./views/users_create.html", { root: "." });
});

router.get("/users_edit/", function (req, res, next) {
  res.sendFile("./views/users_edit.html", { root: "." });
});

module.exports = router;
