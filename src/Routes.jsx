import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Parks from "./Parks";
import Park from "./Park";
import NewPark from "./NewPark";

export default (
  <Router>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/parks" exact component={Parks} />
      <Route path="/park/:id" exact component={Park} />
      <Route path="/park" exact component={NewPark} />
    </Switch>
  </Router>
);