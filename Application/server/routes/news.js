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
                `https://newsapi.org/v2/everything?q=${element.topic}&apiKey=${process.env.NEWS_KEY}`
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
        req.body.width = req.body.width || 100;
        req.body.height = req.body.height || 100;
        req.body.order = req.body.order || 100;
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

// router.put("/", requireAuth, (req, res) => {
//   Sticky.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
//     if (err) {
//       res.status(400).send({ message: "Update widget failed", err });
//     } else {
//       widget.width = req.body.width || 100;
//       widget.height = req.body.height || 100;
//       widget.order = req.body.order || 100;
//       widget.text = req.body.text || "";
//       widget.color = req.body.color || "#ffffff";
//       widget.textColor = req.body.textColor || "#000000";

//       widget.save((err, savedWidget) => {
//         if (err) {
//           res.status(400).send({ message: "Update Sticky failed", err });
//         } else {
//           res.send({
//             message: "Updated sticky successfully",
//             widget: savedWidget.hide(),
//           });
//         }
//       });
//     }
//   });
// });

// router.delete("/", requireAuth, (req, res) => {
//   Sticky.findByIdAndRemove(req.body.id, (err) => {
//     if (err) {
//       res.status(400).send({ message: "Delete sticky failed", err });
//     } else {
//       res.send({ message: "sticky successfully deleted" });
//     }
//   });
// });
