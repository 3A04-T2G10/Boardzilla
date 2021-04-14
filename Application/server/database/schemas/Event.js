const mongoose = require("mongoose");
const R = require("ramda");

const { Schema } = mongoose;

const eventSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  type: { type: String },
  date: { type: Number },
  text: { type: String },
});

eventSchema.methods.hide = function () {
  return R.omit(["__v"], this.toObject());
};

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
