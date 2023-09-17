const fs = require("fs");

function authenticator(req, res, next) {
  console.log("Authenticating...");
  console.log(req.query.id);
  // console.log(req.body.storedId);
  const data = fs.readFileSync("./data/users.json", "utf8");
  const users = JSON.parse(data);
  const user = users.find((user) => user.author_id === req.query.id);

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

  return res.sendFile("./views/login.html", { root: "." });
}

module.exports = authenticator;
