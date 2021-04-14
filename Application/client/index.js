import React from "react";
import ReactDOM from "react-dom";

import "core-js/stable";
import "regenerator-runtime/runtime";
import "react-notifications-component/dist/theme.css";
import "animate.css/animate.compat.css";

import history from "_client/history";
import store from "_client/store";
import Root from "_entry/Root";

ReactDOM.render(
  <Root history={history} store={store} />,
  document.getElementById("root")
);
