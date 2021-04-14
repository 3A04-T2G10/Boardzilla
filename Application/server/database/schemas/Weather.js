const mongoose = require("mongoose");
const R = require("ramda");

const { Schema } = mongoose;

const weatherSchema = new Schema({
  user: { type: Schema.ObjectId, ref: "User", required: true },
  type: { type: String },
  x: { type: Number },
  y: { type: Number },
  width: { type: Number },
  height: { type: Number },
  place: { type: String },
  timeOffset: { type: Number },
  current: {
    temp: { type: Number },
    feelsLike: { type: Number },
    pressure: { type: Number },
    humidity: { type: Number },
    uvi: { type: Number },
    windSpd: { type: Number },
    dt: { type: Number },
    sunrise: { type: Number },
    sunset: { type: Number },
    description: { type: String },
    iconId: { type: Number },
    icon: { type: String },
  },
  hourly: [
    {
      dt: { type: Number },
      temp: { type: Number },
      feelsLike: { type: Number },
      pop: { type: Number },
      description: { type: String },
      iconId: { type: Number },
      icon: { type: String },
    },
  ],
  daily: [
    {
      dt: { type: Number },
      temp: { type: Number },
      high: { type: Number },
      low: { type: Number },
      pop: { type: Number },
      description: { type: String },
      iconId: { type: Number },
      icon: { type: String },
    },
  ],
  alert: {
    eventName: { type: String },
    start: { type: Number },
    end: { type: Number },
  },
  lat: { type: Number },
  lng: { type: Number },
  lastUpdated: { type: Date, default: Date.now },
});

weatherSchema.methods.hide = function () {
  return R.omit(["__v"], this.toObject());
};

const Weather = mongoose.model("Weather", weatherSchema);

module.exports = Weather;
