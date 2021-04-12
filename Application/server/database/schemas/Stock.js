const mongoose = require("mongoose");
const R = require("ramda");

const { Schema } = mongoose;

const stockSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  type: { type: String },
  width: { type: Number },
  height: { type: Number },
  order: { type: Number },
  intraDay: { type: Array },
  symbol: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

stockSchema.methods.hide = function () {
  return R.omit(["__v"], this.toObject());
};

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
