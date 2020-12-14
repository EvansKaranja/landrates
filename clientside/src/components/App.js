import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import "./App.css";
import Map from "./Rates/Map";
import Admin from "./Rates/Admin/Admin"
import LandingPage from "./Layout/LandingPage"
import PrivateRoute from "./common/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {/* <Map/> */}
            {/* <LandingPage/> */}
            {/* <Route exact path="/" component={LandingPage} /> */}
            <Route exact path="/" component={Map} />
            <Route exact path="/admin" component={Admin} />


            {/* <Switch>
              <PrivateRoute exact path="/admin" component={Admin} />
            </Switch> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
