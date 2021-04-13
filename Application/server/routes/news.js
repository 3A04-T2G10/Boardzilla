const express = require("express");
const fetch = require("node-fetch");
const { requireAuth } = require("./middleware");
const { News } = require("../database/schemas");

const router = express.Router();
module.exports = router;

router.get("/", requireAuth, (req, res) => {
  News.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, news) => {
    if (err) {
      res.status(400).send({ message: "Get news widgets failed", err });
    } else {
      const now = new Date();
      news.forEach((element) => {
        if (now - element.lastUpdated > 3600000) {
          News.findById(element._id, { __v: 0, user: 0 }, (err, widget) => {
            if (err) {
              res.status(400).send({ message: "get news widget failed", err });
            } else {
              fetch(
                `https://newsapi.org/v2/everything?q=${element.topic}&sortBy=popularity&apiKey=${process.env.NEWS_KEY}`
              )
                .then((res) => res.json())
                .then((json) => {
                  widget.articles = json.articles;
                  widget.lastUpdated = new Date();
                  element.articles = json.articles;
                  element.lastUpdated = new Date();

                  widget.save((err) => {
                    if (err) {
                      res
                        .status(400)
                        .send({ message: "get news widget failed", err });
                    } else {
                      console.log("new news");
                    }
                  });
                })
                .catch((err) => {
                  res
                    .status(400)
                    .send({ message: "get news widget failed", err });
                });
            }
          });
        } else {
          console.log("old news");
        }
      });
      res.send({ message: "news retrieved successfully", news });
    }
  });
});

router.post("/", requireAuth, (req, res) => {
  if (!req.body.topic) {
    res
      .status(400)
      .send({ message: "Create news widget failed", error: "no topic chosen" });
  } else {
    fetch(
      `https://newsapi.org/v2/everything?q=${req.body.topic}&apiKey=${process.env.NEWS_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        req.body.user = req.user.id;
        req.body.width = req.body.width || 300;
        req.body.height = req.body.height || 300;
        req.body.x = req.body.x || 0;
        req.body.y = req.body.y || 0;
        req.body.topic = req.body.topic || "";
        req.body.articles = json.articles;
        req.body.lastUpdated = new Date();
        req.body.type = "news";

        const newNews = News(req.body);

        newNews.save((err, savedNews) => {
          if (err) {
            res.status(400).send({ message: "Create news widget failed", err });
          } else {
            res.send({
              message: "News widget created successfully",
              newsItem: savedNews.hide(),
            });
          }
        });
      })
      .catch((err) => {
        res.status(400).send({ message: "Create news widget failed", err });
      });
  }
});

router.put("/", requireAuth, (req, res) => {
  News.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update widget failed", err });
    } else {
      if (!req.body.topic)
        res.status(400).send({ message: "Update widget failed", err });
      else {
        console.log("updating news with topic ", req.body.topic);
        fetch(
          `https://newsapi.org/v2/everything?q=${req.body.topic}&apiKey=${process.env.NEWS_KEY}`
        )
          .then((res) => res.json())
          .then((json) => {
            widget.topic = req.body.topic;
            widget.lastUpdated = new Date();
            widget.articles = json.articles;

            widget.save((err, savedWidget) => {
              if (err) {
                res.status(400).send({ message: "Update News failed", err });
              } else {
                res.send({
                  message: "Updated news successfully",
                  widget: savedWidget.hide(),
                });
              }
            });
          })
          .catch((err) => {
            res.status(400).send({ message: "Update News failed", err });
          });
      }
    }
  });
});

router.put("/layout", requireAuth, (req, res) => {
  News.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update News failed", err });
    } else {
      widget.x = req.body.x || widget.x;
      widget.y = req.body.y || widget.y;
      widget.width = req.body.width || widget.width;
      widget.height = req.body.height || widget.height;

      widget.save((err, savedWidget) => {
        if (err) {
          res.status(400).send({ message: "Update News layout failed", err });
        } else {
          res.send({
            message: "Updated News layout successfully",
            widget: savedWidget.hide(),
          });
        }
      });
    }
  });
});

router.delete("/", requireAuth, (req, res) => {
  News.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete news widget failed", err });
    } else {
      res.send({ message: "news widget successfully deleted" });
    }
  });
});
