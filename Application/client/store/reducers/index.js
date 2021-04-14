import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import stickies from "./stickies";
import news from "./news";
import stocks from "./stocks";
import weather from "./weather";
import events from "./events";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    stickies,
    news,
    stocks,
    weather,
    events,
  });

export default createRootReducer;
