const express = require("express");
const app = express();

// app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const indexRouter = require("./routes/index");
const loginRouter = require("./routes/login");
const usersRouter = require("./routes/users");
const articlesRouter = require("./routes/articles");
const scriptsRouter = require("./routes/scripts");

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/users", usersRouter);
app.use("/articles", articlesRouter);
app.use("/scripts", scriptsRouter);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000/");
});
