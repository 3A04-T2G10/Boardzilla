const mongoose = require("mongoose");
const R = require("ramda");

const { Schema } = mongoose;

const stickySchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  type: { type: String },
  text: { type: String },
  color: { type: String },
  width: { type: Number },
  height: { type: Number },
  order: { type: Number },
});

stickySchema.methods.hide = function () {
  return R.omit(["__v"], this.toObject());
};

const Sticky = mongoose.model("Sticky", stickySchema);

module.exports = Sticky;
