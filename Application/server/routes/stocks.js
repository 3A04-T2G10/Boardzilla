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
                `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${stock.symbol}&apikey=${process.env.STOCK_KEY}`
              )
                .then((res) => res.json())
                .then((json) => {
                  widget.dailyData = {
                    highest: 0,
                    lowest: Number.MAX_VALUE,
                    dateTime: [],
                    open: [],
                    close: [],
                    high: [],
                    low: [],
                    volume: [],
                  };

                  for (let key in json["Time Series (Daily)"]) {
                    widget.dailyData.dateTime.push(key);
                    widget.dailyData.lowest = Math.min(
                      widget.dailyData.lowest,
                      json["Time Series (Daily)"][key]["3. low"]
                    );
                    widget.dailyData.highest = Math.max(
                      widget.dailyData.highest,
                      json["Time Series (Daily)"][key]["2. high"]
                    );
                    widget.dailyData.open.push(
                      json["Time Series (Daily)"][key]["1. open"]
                    );
                    widget.dailyData.close.push(
                      json["Time Series (Daily)"][key]["4. close"]
                    );
                    widget.dailyData.high.push(
                      json["Time Series (Daily)"][key]["2. high"]
                    );
                    widget.dailyData.low.push(
                      json["Time Series (Daily)"][key]["3. low"]
                    );
                    widget.dailyData.volume.push(
                      json["Time Series (Daily)"][key]["5. volume"]
                    );
                  }

                  widget.lastUpdated = new Date();
                  stock.dailyData = widget.dailyData;
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
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.body.symbol}&apikey=${process.env.STOCK_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        req.body.user = req.user.id;
        req.body.width = req.body.width || 300;
        req.body.height = req.body.height || 300;
        req.body.x = req.body.x || 0;
        req.body.y = req.body.y || 0;

        req.body.dailyData = {
          highest: 0,
          lowest: Number.MAX_VALUE,
          dateTime: [],
          open: [],
          close: [],
          high: [],
          low: [],
          volume: [],
        };

        for (let key in json["Time Series (Daily)"]) {
          req.body.dailyData.dateTime.push(key);
          req.body.dailyData.lowest = Math.min(
            req.body.dailyData.lowest,
            json["Time Series (Daily)"][key]["3. low"]
          );
          req.body.dailyData.highest = Math.max(
            req.body.dailyData.highest,
            json["Time Series (Daily)"][key]["2. high"]
          );
          req.body.dailyData.open.push(
            json["Time Series (Daily)"][key]["1. open"]
          );
          req.body.dailyData.close.push(
            json["Time Series (Daily)"][key]["4. close"]
          );
          req.body.dailyData.high.push(
            json["Time Series (Daily)"][key]["2. high"]
          );
          req.body.dailyData.low.push(
            json["Time Series (Daily)"][key]["3. low"]
          );
          req.body.dailyData.volume.push(
            json["Time Series (Daily)"][key]["5. volume"]
          );
        }

        req.body.lastUpdated = new Date();
        req.body.type = "stock";

        const newStock = Stock(req.body);

        newStock.save((err, savedStock) => {
          if (err) {
            console.log("error here");
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
          `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${req.body.symbol}&apikey=${process.env.STOCK_KEY}`
        )
          .then((res) => res.json())
          .then((json) => {
            widget.symbol = req.body.symbol;
            widget.lastUpdated = new Date();
            widget.dailyData = {
              highest: 0,
              lowest: Number.MAX_VALUE,
              dateTime: [],
              open: [],
              close: [],
              high: [],
              low: [],
              volume: [],
            };

            for (let key in json["Time Series (Daily)"]) {
              widget.dailyData.dateTime.push(key);
              widget.dailyData.lowest = Math.min(
                widget.dailyData.lowest,
                json["Time Series (Daily)"][key]["3. low"]
              );
              widget.dailyData.highest = Math.max(
                widget.dailyData.highest,
                json["Time Series (Daily)"][key]["2. high"]
              );
              widget.dailyData.open.push(
                json["Time Series (Daily)"][key]["1. open"]
              );
              widget.dailyData.close.push(
                json["Time Series (Daily)"][key]["4. close"]
              );
              widget.dailyData.high.push(
                json["Time Series (Daily)"][key]["2. high"]
              );
              widget.dailyData.low.push(
                json["Time Series (Daily)"][key]["3. low"]
              );
              widget.dailyData.volume.push(
                json["Time Series (Daily)"][key]["5. volume"]
              );
            }

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

router.put("/layout", requireAuth, (req, res) => {
  Stock.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update widget failed", err });
    } else {
      widget.x = req.body.x || widget.x;
      widget.y = req.body.y || widget.y;
      widget.width = req.body.width || widget.width;
      widget.height = req.body.height || widget.height;

      widget.save((err, savedWidget) => {
        if (err) {
          res.status(400).send({ message: "Update stock layout failed", err });
        } else {
          res.send({
            message: "Updated stock layout successfully",
            widget: savedWidget.hide(),
          });
        }
      });
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
