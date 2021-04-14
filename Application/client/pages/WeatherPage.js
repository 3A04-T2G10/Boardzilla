import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";
import Weather from "_widgets/Weather/Weather";
import { attemptGetWeather } from "_thunks/weather";

export const WeatherPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);
  const { weather } = useSelector(R.pick(["weather"]));

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      dispatch(attemptGetWeather()).then(() => {
        setLoading(false);
      });
    }
  }, []);
  return (
    !loading && (
      <div>
        <>
          <ul className="sticky-list">
            {weather.map((widget) => (
              <Weather key={widget.id} {...widget} />
            ))}
          </ul>
        </>
      </div>
    )
  );
};
export default WeatherPage;
