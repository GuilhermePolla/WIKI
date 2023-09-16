const express = require("express");
const authenticator = require("../middleware/authenticator");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("./views/login.html", { root: "." });
});

router.get("/admin", authenticator, function (req, res, next) {
  res.sendFile("./views/admin.html", { root: "." });
});

router.get("/user", authenticator, function (req, res, next) {
  res.sendFile("./views/user.html", { root: "." });
});

module.exports = router;
