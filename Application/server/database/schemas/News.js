const mongoose = require("mongoose");
const R = require("ramda");

const { Schema } = mongoose;

const newsSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  type: { type: String },
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number },
  articles: { type: Array },
  topic: { type: String },
  lastUpdated: { type: Date, default: Date.now },
});

newsSchema.methods.hide = function () {
  return R.omit(["__v"], this.toObject());
};

const News = mongoose.model("News", newsSchema);

module.exports = News;
