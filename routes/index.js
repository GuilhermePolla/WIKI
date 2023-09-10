const express = require("express");

const app = express();

const loginRouter = require("./login");
const usersRouter = require("./users");
const articlesRouter = require("./articles");

app.get("/", function (req, res) {
  res.sendFile("./views/index.html", { root: "." });
});

app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
