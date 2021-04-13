const express = require("express");
const { requireAuth } = require("./middleware");
const { Sticky } = require("../database/schemas");

const router = express.Router();
module.exports = router;

router.get("/", requireAuth, (req, res) => {
  Sticky.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, stickies) => {
    if (err) {
      res.status(400).send({ message: "Get stickies failed", err });
    } else {
      res.send({ message: "stickies retrieved successfully", stickies });
    }
  });
});

router.post("/", requireAuth, (req, res) => {
  req.body.user = req.user.id;
  req.body.width = req.body.width || 100;
  req.body.height = req.body.height || 100;
  req.body.order = req.body.order || 100;
  req.body.text = req.body.text || "";
  req.body.color = req.body.color || "#ffffff";
  req.body.textColor = req.body.textColor || "#000000";
  req.body.type = "sticky";
  const newSticky = Sticky(req.body);

  newSticky.save((err, savedSticky) => {
    if (err) {
      res.status(400).send({ message: "Create sticky failed", err });
    } else {
      res.send({
        message: "Sticky created successfully",
        sticky: savedSticky.hide(),
      });
    }
  });
});

router.put("/", requireAuth, (req, res) => {
  Sticky.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update widget failed", err });
    } else {
      widget.text = req.body.text || widget.text;
      widget.color = req.body.color || widget.color;
      widget.textColor = req.body.textColor || widget.textColor;

      widget.save((err, savedWidget) => {
        if (err) {
          res.status(400).send({ message: "Update Sticky failed", err });
        } else {
          res.send({
            message: "Updated sticky successfully",
            widget: savedWidget.hide(),
          });
        }
      });
    }
  });
});

router.put("/layout", requireAuth, (req, res) => {
  Sticky.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update sticky failed", err });
    } else {
      widget.x = req.body.x || widget.x;
      widget.y = req.body.y || widget.y;
      widget.width = req.body.width || widget.width;
      widget.height = req.body.height || widget.height;

      widget.save((err, savedWidget) => {
        if (err) {
          res.status(400).send({ message: "Update sticky layout failed", err });
        } else {
          res.send({
            message: "Updated sticky layout successfully",
            widget: savedWidget.hide(),
          });
        }
      });
    }
  });
});

router.delete("/", requireAuth, (req, res) => {
  Sticky.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete sticky failed", err });
    } else {
      res.send({ message: "sticky successfully deleted" });
    }
  });
});
