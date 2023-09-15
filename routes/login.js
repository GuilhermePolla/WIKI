const express = require("express");

const router = express.Router();

router.get("/", function (req, res, next) {
  res.sendFile("./views/login.html", { root: "." });
});

router.post("/test", (req, res) => {
  console.log(req.body);
  console.log(`${req.body.username} ${req.body.password}`);
  if (req.body.username === "admin" && req.body.password === "admin") {
    // res.status(200).sendFile("./views/admin.html", { root: "." });
    return res.status(200).json({ status: "admin" });
  }
  if (req.body.username === "user" && req.body.password === "user") {
    // res.status(200).sendFile("./views/index.html", { root: "." });
    return;
  }
  res.status(400).send("Invalid username/password");
  return;
});

module.exports = router;
