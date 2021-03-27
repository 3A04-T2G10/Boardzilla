import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: RouteComponent, ...rest }) => {
  return (
    // <Route
    //     {...rest}
    //     render={routeProps =>
    //         !!firebase.auth().currentUser ?
    //             (<RouteComponent {...routeProps} />)
    //             : (<Redirect to={"/login"} />)
    //     }
    // />
    // <Route
    //   {...rest}
    //   render={(routeProps) => <RouteComponent {...routeProps} />}
    // />
    <Route {...rest} render={(routeProps) => <Redirect to={"/login"} />} />
  );
};
export default PrivateRoute;
