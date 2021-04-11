import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import user from "./user";
import stickies from "./stickies";
import news from "./news";

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    user,
    stickies,
    news,
  });

export default createRootReducer;
