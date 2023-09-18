const fs = require("fs");
const express = require("express");
const app = express();
const sha256 = require("js-sha256").sha256;

const session = require("express-session");
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: true,
  })
);

function authenticator(req, res, next) {
  const safePaths = [
    "/",
    "/login",
    "/scripts/login.js",
    "/scripts/index.js",
    "/destaques",
    "/articles/",
    "/scripts/admin.js",
    "/scripts/articles_create.js",
    "/scripts/articles_edit.js",
    "/scripts/articles.js",
    "/scripts/user.js",
    "/scripts/users_create.js",
    "/scripts/users_edit.js",
  ];
  if (safePaths.includes(req.path)) {
    return next();
  }
  console.log("Authenticating...");
  console.log(req.body.username);
  console.log(req.body.password);
  // console.log(req.body.storedId);
  const data = fs.readFileSync("./data/users.json", "utf8");
  const users = JSON.parse(data);
  const user = users.find(
    (user) =>
      user.username === req.body.author_user &&
      sha256(user.password) === req.body.author_pwd
  );

  if (user !== undefined) {
    if (user.author_level === "admin") {
      console.log("Authenticated as admin");
      req.body.authenticated = "admin";
      return next();
    }
    if (user.author_level === "user") {
      console.log("Authenticated as user");
      req.body.authenticated = "user";
      return next();
    }
  }

  console.log("Not authenticated");

  return res.redirect("./views/login.html", { root: "." });
}

module.exports = authenticator;
