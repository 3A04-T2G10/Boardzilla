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
      widget.width = req.body.width || 100;
      widget.height = req.body.height || 100;
      widget.order = req.body.order || 100;
      widget.text = req.body.text || "";
      widget.color = req.body.color || "default";

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

router.delete("/", requireAuth, (req, res) => {
  Sticky.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete sticky failed", err });
    } else {
      res.send({ message: "sticky successfully deleted" });
    }
  });
});
