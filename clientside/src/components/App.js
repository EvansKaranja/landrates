import React, { Component } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../store";
import "./App.css";
import Map from "./Rates/Map";
import PrivateRoute from "./common/PrivateRoute";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Map/>
            {/* <Switch>
              <PrivateRoute exact path="/map" component={Map} />
            </Switch> */}
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
