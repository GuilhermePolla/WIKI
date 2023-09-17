const express = require("express");
const authenticator = require("../middleware/authenticator");

const router = express.Router();

// router.get("/", function (req, res, next) {
//   res.sendFile("./views/login.html", { root: "." });
// });

router.get("/", authenticator, function (req, res, next) {
  if (req.body.authenticated === "admin") {
    return res.sendFile("./views/admin.html", { root: "." });
  }
  if (req.body.authenticated === "user") {
    return res.sendFile("./views/user.html", { root: "." });
  }

  return res.sendFile("./views/login.html", { root: "." });
});

// router.get("/user", authenticator, function (req, res, next) {
//   if (req.body.authenticated === "user") {
//     res.sendFile("./views/user.html", { root: "." });
//   } else {
//     res.sendFile("./views/login.html", { root: "." });
//   }
// });

module.exports = router;
