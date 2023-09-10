const express = require("express");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("./views/login.html", { root: "." });
});

router.get("/:usuario/:senha", (req, res) => {
  console.log(req.params);
  res.sendFile("./views/admin.html", { root: "." });
});

module.exports = router;
