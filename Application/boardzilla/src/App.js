// import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LogIn from "./Components/Auth/LogIn";
import Register from "./Components/Auth/Register";

import Widget from "./Components/Widget";
import Dashboard from "./Components/Dashboard";
// import Example from './example'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AuthProvider } from "./Components/Auth/Auth";
import { GlobalProvider } from "./Context/GlobalState";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <AuthProvider>
      <GlobalProvider>
        <DndProvider backend={HTML5Backend}>
          <Router>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/register" component={Register} />
              {/* <Route exact path="/forgotpassword" component={ForgotPassword} /> */}
            </Switch>
          </Router>
        </DndProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

export default App;
