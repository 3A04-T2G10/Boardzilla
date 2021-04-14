const express = require("express");
const { requireAuth } = require("./middleware");
const { Event } = require("../database/schemas");

const router = express.Router();
module.exports = router;

router.get("/", requireAuth, (req, res) => {
  Event.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, events) => {
    if (err) {
      res.status(400).send({ message: "Get events failed", err });
    } else {
      res.send({ message: "events retrieved successfully", events });
    }
  });
});

router.post("/", requireAuth, (req, res) => {
  req.body.user = req.user.id;
  req.body.text = req.body.text || "";
  req.body.date = Date.parse(req.body.date) || Date.now();
  req.body.type = "event";
  const newEvent = Event(req.body);

  newEvent.save((err, savedEvent) => {
    if (err) {
      res.status(400).send({ message: "Create event failed", err });
    } else {
      res.send({
        message: "Event created successfully",
        event: savedEvent.hide(),
      });
    }
  });
});

router.put("/", requireAuth, (req, res) => {
  Event.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update widget failed", err });
    } else {
      widget.text = req.body.text || widget.text;
      widget.date = req.body.date || widget.date;

      widget.save((err, savedWidget) => {
        if (err) {
          res.status(400).send({ message: "Update event failed", err });
        } else {
          res.send({
            message: "Updated event successfully",
            widget: savedWidget.hide(),
          });
        }
      });
    }
  });
});

router.delete("/", requireAuth, (req, res) => {
  Event.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete event failed", err });
    } else {
      res.send({ message: "event successfully deleted" });
    }
  });
});
