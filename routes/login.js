const express = require("express");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("./views/login.html", { root: "." });
});

router.post("/", (req, res) => {
  console.log(`${req.body.username} ${req.body.password}`);
  //authenticator
  //is admin
  res.sendFile("./views/admin.html", { root: "." });
  //is user
  res.sendFile("./views/index.html", { root: "." });
  //not found
  res.status(400).send({
    message: "Invalid username/password",
  });
  return;
});

module.exports = router;
