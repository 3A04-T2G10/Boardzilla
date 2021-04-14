import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { push } from "connected-react-router";
import R from "ramda";

import { attemptGetStickies } from "_thunks/stickies";
import { attemptGetStocks } from "_thunks/stocks";
import { attemptGetNews } from "_thunks/news";
import { attemptGetWeather } from "_thunks/weather";
import WidgetList from "_components/WidgetList";

export default function Dasboard() {
  const dispatch = useDispatch();
  const { user } = useSelector(R.pick(["user"]));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (R.isEmpty(user)) {
      dispatch(push("/login"));
    } else {
      // dispatch(attemptGetStickies()).then(() => setLoading(false));
      const stickyWidgets = dispatch(attemptGetStickies());
      const stocksWidgets = dispatch(attemptGetStocks());
      const newsWidgets = dispatch(attemptGetNews());
      const weatherWidgets = dispatch(attemptGetWeather());
      Promise.allSettled([stickyWidgets, stocksWidgets, newsWidgets, weatherWidgets]).then(() => setLoading(false));
    }
  }, []);

  return (
    !loading && (
      <div className="dashboard-page page">
        <WidgetList />
      </div>
    )
  );
}
