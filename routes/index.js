const express = require("express");

const router = express.Router();

router.get("/", function (req, res) {
  res.sendFile("./views/index.html", { root: "." });
});

router.get("/destaque", function (req, res) {});

router.get("/curtidos", function (req, res) {});

module.exports = router;
