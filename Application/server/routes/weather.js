const express = require("express");
const fetch = require("node-fetch");
const { requireAuth } = require("./middleware");
const { Weather } = require("../database/schemas");

const router = express.Router();
module.exports = router;

router.get("/", requireAuth, (req, res) => {
  Weather.find({ user: req.user.id }, { __v: 0, user: 0 }, (err, widgets) => {
    if (err) {
      res.status(400).send({ message: "Get weather widgets failed", err });
    } else {
      const now = new Date();
      widgets.forEach((weather) => {
        if (now - weather.lastUpdated > 900000) {
          Weather.findById(weather._id, { __v: 0, user: 0 }, (err, widget) => {
            if (err) {
              res
                .status(400)
                .send({ message: "get weather widget failed", err });
            } else {
              fetch(
                `https://api.openweathermap.org/data/2.5/onecall?lat=${widget.lat}&lon=${widget.lng}&exclude=minutely&units=metric&appid=${process.env.WEATHER_KEY}`
              )
                .then((res) => res.json())
                .then((json) => {
                  //db
                  widget.timeOffset = json.timezone_offset;
                  widget.current = {
                    temp: json.current.temp,
                    feelsLike: json.current.feels_like,
                    pressure: json.current.pressure,
                    humidity: json.current.humidity,
                    uvi: json.current.uvi,
                    windSpd: json.current.wind_speed,
                    dt: json.current.dt,
                    sunrise: json.current.sunrise,
                    sunset: json.current.sunset,
                    description: json.current.weather[0].description,
                    icon: json.current.weather[0].icon,
                    iconId: json.current.weather[0].id,
                  };

                  widget.hourly = [];
                  json.hourly.forEach((hour) => {
                    widget.hourly.push({
                      dt: hour.dt,
                      temp: hour.temp,
                      feelsLike: hour.feels_like,
                      pop: hour.pop,
                      description: hour.weather[0].description,
                      icon: hour.weather[0].icon,
                      iconId: hour.weather[0].id,
                    });
                  });

                  widget.daily = [];
                  json.daily.forEach((day) => {
                    widget.daily.push({
                      dt: day.dt,
                      temp: day.temp.day,
                      high: day.temp.max,
                      low: day.temp.min,
                      pop: day.pop,
                      description: day.weather[0].description,
                      icon: day.weather[0].icon,
                      iconId: day.weather[0].id,
                    });
                  });

                  widget.alert = {
                    eventName: (json.alerts && json.alerts[0].event) || "",
                    start: (json.alerts && json.alerts[0].start) || 0,
                    end: (json.alerts && json.alerts[0].end) || 0,
                  };

                  widget.lastUpdated = new Date();

                  //returned to client
                  weather.lastUpdated = widget.lastUpdated;
                  weather.timeOffset = widget.timeOffset;
                  weather.current = widget.current;
                  weather.hourly = widget.hourly;
                  weather.daily = widget.daily;
                  weather.alert = widget.alert;

                  widget.save((err) => {
                    if (err) {
                      res
                        .status(400)
                        .send({ message: "get weather widget failed", err });
                    } else {
                      console.log("new weather");
                    }
                  });
                })
                .catch((err) => {
                  res
                    .status(400)
                    .send({ message: "get weather widget failed", err });
                });
            }
          });
        } else {
          console.log("old weather");
        }
      });
      res.send({ message: "weather retrieved successfully", widgets });
    }
  });
});

router.post("/", requireAuth, (req, res) => {
  if (!req.body.city) {
    res.status(400).send({
      message: "Create weather widget failed",
      error: "no city chosen",
    });
  } else {
    req.body.state = req.body.state || "";
    req.body.country = req.body.country || "";

    req.body.user = req.user.id;
    req.body.width = req.body.width || 8;
    req.body.height = req.body.height || 5;
    req.body.x = req.body.x || 0;
    req.body.y = req.body.y || 0;
    req.body.lastUpdated = new Date();

    let place = encodeURIComponent(
      `${req.body.city},${req.body.state},${req.body.country}`
    );

    fetch(
      `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${process.env.GEO_KEY}&limit=1`
    )
      .then((geo_res) => geo_res.json())
      .then((geo_json) => {
        req.body.lat = geo_json.results[0].geometry.lat;
        req.body.lng = geo_json.results[0].geometry.lng;
        req.body.place = geo_json.results[0].formatted;
        return fetch(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.lat}&lon=${req.body.lng}&exclude=minutely&units=metric&appid=${process.env.WEATHER_KEY}`
        );
      })
      .then((res) => res.json())
      .then((json) => {
        let newWeather = {
          user: req.body.user,
          type: "weather",
          x: req.body.x,
          y: req.body.y,
          width: req.body.width,
          height: req.body.height,
          lastUpdated: req.body.lastUpdated,
          place: req.body.place,
          lat: req.body.lat,
          lng: req.body.lng,
          timeOffset: json.timezone_offset,
          current: {
            temp: json.current.temp,
            feelsLike: json.current.feels_like,
            pressure: json.current.pressure,
            humidity: json.current.humidity,
            uvi: json.current.uvi,
            windSpd: json.current.wind_speed,
            dt: json.current.dt,
            sunrise: json.current.sunrise,
            sunset: json.current.sunset,
            description: json.current.weather[0].description,
            icon: json.current.weather[0].icon,
            iconId: json.current.weather[0].id,
          },
          hourly: [],
          daily: [],
          alert: {
            eventName: (json.alerts && json.alerts[0].event) || "",
            start: (json.alerts && json.alerts[0].start) || 0,
            end: (json.alerts && json.alerts[0].end) || 0,
          },
        };
        json.hourly.forEach((hour) => {
          newWeather.hourly.push({
            dt: hour.dt,
            temp: hour.temp,
            feelsLike: hour.feels_like,
            pop: hour.pop,
            description: hour.weather[0].description,
            icon: hour.weather[0].icon,
            iconId: hour.weather[0].id,
          });
        });

        json.daily.forEach((day) => {
          newWeather.daily.push({
            dt: day.dt,
            temp: day.temp.day,
            high: day.temp.max,
            low: day.temp.min,
            pop: day.pop,
            description: day.weather[0].description,
            icon: day.weather[0].icon,
            iconId: day.weather[0].id,
          });
        });
        const widget = Weather(newWeather);
        widget.save((err, savedWeather) => {
          if (err) {
            console.log("error here");
            res
              .status(400)
              .send({ message: "Create weather widget failed", err });
          } else {
            res.send({
              message: "weather widget created successfully",
              weather: savedWeather.hide(),
            });
          }
        });
      })
      .catch((err) => {
        res.status(400).send({ message: "create weather failed", err });
      });
  }
});

router.put("/", requireAuth, (req, res) => {
  Weather.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update widget failed", err });
    } else {
      if (!req.body.city)
        res.status(400).send({ message: "Update widget failed", err });
      else {
        console.log("updating weather with city ", req.body.city);
        req.body.state = req.body.state || "";
        req.body.country = req.body.country || "";
        let place = encodeURIComponent(
          `${req.body.city},${req.body.state},${req.body.country}`
        );

        fetch(
          `https://api.opencagedata.com/geocode/v1/json?q=${place}&key=${process.env.GEO_KEY}&limit=1`
        )
          .then((geo_res) => geo_res.json())
          .then((geo_json) => {
            widget.lat = geo_json.results[0].geometry.lat;
            widget.lng = geo_json.results[0].geometry.lng;
            widget.place = geo_json.results[0].formatted;
            return fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${widget.lat}&lon=${widget.lng}&exclude=minutely&units=metric&appid=${process.env.WEATHER_KEY}`
            );
          })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            //db
            widget.timeOffset = json.timezone_offset;
            widget.current = {
              temp: json.current.temp,
              feelsLike: json.current.feels_like,
              pressure: json.current.pressure,
              humidity: json.current.humidity,
              uvi: json.current.uvi,
              windSpd: json.current.wind_speed,
              dt: json.current.dt,
              sunrise: json.current.sunrise,
              sunset: json.current.sunset,
              description: json.current.weather[0].description,
              icon: json.current.weather[0].icon,
              iconId: json.current.weather[0].id,
            };

            widget.hourly = [];
            json.hourly.forEach((hour) => {
              widget.hourly.push({
                dt: hour.dt,
                temp: hour.temp,
                feelsLike: hour.feels_like,
                pop: hour.pop,
                description: hour.weather[0].description,
                icon: hour.weather[0].icon,
                iconId: hour.weather[0].id,
              });
            });

            widget.daily = [];
            json.daily.forEach((day) => {
              widget.daily.push({
                dt: day.dt,
                temp: day.temp.day,
                high: day.temp.max,
                low: day.temp.min,
                pop: day.pop,
                description: day.weather[0].description,
                icon: day.weather[0].icon,
                iconId: day.weather[0].id,
              });
            });

            widget.alert = {
              eventName: (json.alerts && json.alerts[0].event) || "",
              start: (json.alerts && json.alerts[0].start) || 0,
              end: (json.alerts && json.alerts[0].end) || 0,
            };

            widget.lastUpdated = new Date();

            //returned to client
            widget.save((err, savedWidget) => {
              if (err) {
                res.status(400).send({ message: "Update weather failed", err });
              } else {
                res.send({
                  message: "Updated weather successfully",
                  widget: savedWidget.hide(),
                });
              }
            });
          })
          .catch((err) => {
            res.status(400).send({ message: "update weather failed", err });
          });
      }
    }
  });
});

router.put("/layout", requireAuth, (req, res) => {
  Weather.findById(req.body.id, { __v: 0, user: 0 }, (err, widget) => {
    if (err) {
      res.status(400).send({ message: "Update widget failed", err });
    } else {
      widget.x = req.body.x || 0;
      widget.y = req.body.y || 0;
      widget.width = req.body.width || widget.width;
      widget.height = req.body.height || widget.height;

      widget.save((err, savedWidget) => {
        if (err) {
          res
            .status(400)
            .send({ message: "Update weather layout failed", err });
        } else {
          res.send({
            message: "Updated weather layout successfully",
            widget: savedWidget.hide(),
          });
        }
      });
    }
  });
});

router.delete("/", requireAuth, (req, res) => {
  Weather.findByIdAndRemove(req.body.id, (err) => {
    if (err) {
      res.status(400).send({ message: "Delete weather widget failed", err });
    } else {
      res.send({ message: "weather widget successfully deleted" });
    }
  });
});
