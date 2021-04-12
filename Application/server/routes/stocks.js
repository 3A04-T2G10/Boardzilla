const express = require("express");
const fetch = require("node-fetch");
const { requireAuth } = require("./middleware");
const { Stock } = require("../database/schemas");

const router = express.Router();
module.exports = router;

router.get("/", requireAuth, (req, res) => {
  Stock.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, stocks) => {
    if (err) {
      res.status(400).send({ message: "Get stock widgets failed", err });
    } else {
      const now = new Date();
      stocks.forEach((stock) => {
        if (now - stock.lastUpdated > 3600000) {
          Stock.findById(stock._id, { __v: 0, user: 0 }, (err, widget) => {
            if (err) {
              res.status(400).send({ message: "get stock widget failed", err });
            } else {
              fetch(
                `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock.symbol}&interval=15min&outputsize=full&apikey=${process.env.STOCK_KEY}`
              )
                .then((res) => res.json())
                .then((json) => {
                  widget.intraDay = json["Time Series (15min)"];
                  widget.lastUpdated = new Date();
                  stock.intraDay = json["Time Series (15min)"];
                  stock.lastUpdated = new Date();

                  widget.save((err) => {
                    if (err) {
                      res
                        .status(400)
                        .send({ message: "get stock widget failed", err });
                    } else {
                      console.log("new stock");
                    }
                  });
                })
                .catch((err) => {
                  res
                    .status(400)
                    .send({ message: "get stock widget failed", err });
                });
            }
          });
        } else {
          console.log("old stock");
        }
      });
      res.send({ message: "stock retrieved successfully", stocks });
    }
  });
});

router.post("/", requireAuth, (req, res) => {
  if (!req.body.symbol) {
    res.status(400).send({
      message: "Create stock widget failed",
      error: "no symbol chosen",
    });
  } else {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.body.symbol}&interval=15min&outputsize=full&apikey=${process.env.STOCK_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        req.body.user = req.user.id;
        req.body.width = req.body.width || 100;
        req.body.height = req.body.height || 100;
        req.body.order = req.body.order || 100;
        req.body.symbol = req.body.symbol || "";
        req.body.intraDay = json["Time Series (15min)"];
        req.body.lastUpdated = new Date();
        req.body.type = "stock";

        const newStock = Stock(req.body);

        newStock.save((err, savedStock) => {
          if (err) {
            res
              .status(400)
              .send({ message: "Create stock widget failed", err });
          } else {
            res.send({
              message: "stock widget created successfully",
              stock: savedStock.hide(),
            });
          }
        });
      })
      .catch((err) => {
        res.status(400).send({ message: "Create stock widget failed", err });
      });
  }
});

router.put("/", requireAuth, (req, res) => {
  Stock.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update widget failed", err });
    } else {
      if (!req.body.symbol || req.body.symbol === widget.symbol)
        res.status(400).send({ message: "Update widget failed", err });
      else {
        console.log("updating stock with symbol ", req.body.symbol);
        fetch(
          `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${req.body.symbol}&interval=15min&outputsize=full&apikey=${process.env.STOCK_KEY}`
        )
          .then((res) => res.json())
          .then((json) => {
            if (req.body.width) widget.width = req.body.width;
            if (req.body.height) widget.height = req.body.height;
            if (req.body.order) widget.order = req.body.order;
            widget.symbol = req.body.symbol;
            widget.lastUpdated = new Date();
            widget.intraDay = json["Time Series (15min)"];

            widget.save((err, savedWidget) => {
              if (err) {
                res.status(400).send({ message: "Update stock failed", err });
              } else {
                res.send({
                  message: "Updated stock successfully",
                  widget: savedWidget.hide(),
                });
              }
            });
          })
          .catch((err) => {
            res.status(400).send({ message: "Update Stock failed", err });
          });
      }
    }
  });
});

router.delete("/", requireAuth, (req, res) => {
  Stock.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete stock widget failed", err });
    } else {
      res.send({ message: "stock widget successfully deleted" });
    }
  });
});
