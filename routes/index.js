const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: true }));

const loginRouter = require("./login");
const usersRouter = require("./users");
const articlesRouter = require("./articles");

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

app.get("/", function (req, res) {
  res.sendFile("./views/index.html", { root: "." });
});

app.get("/destaque", function (req, res) {});

app.get("/curtidos", function (req, res) {});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
