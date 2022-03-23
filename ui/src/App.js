import "./App.css";
import React, { useState } from "react";
import Form from "./component/Form";
import Predict from "./component/Predict";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Chart from "./component/chart";

const App = () => {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Form />
          </Route>
          <Route path="/Predict" exact>
            <Predict />
          </Route>
          <Route path="/chart" exact>
            <Chart />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
