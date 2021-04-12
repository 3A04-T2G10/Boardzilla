const express = require("express");
const path = require("path");

const auth = require("./auth");
const user = require("./user");
const users = require("./users");
const stickies = require("./stickies");
const news = require("./news");
const stocks = require("./stocks");
const router = express.Router();

router.use("/api/auth", auth);
router.use("/api/user", user);
router.use("/api/users", users);
router.use("/api/stickies", stickies);
router.use("/api/news", news);
router.use("/api/stocks", stocks);

router.get("/api/tags", (req, res) => {
  res.send([
    "MERN",
    "Node",
    "Express",
    "Webpack",
    "React",
    "Redux",
    "Mongoose",
    "Bulma",
    "Fontawesome",
    "Ramda",
    "ESLint",
    "Enzyme",
  ]);
});

router.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

module.exports = router;
