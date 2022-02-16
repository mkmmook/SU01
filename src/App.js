import "./App.css";
import React from "react";
import Form from "./component/Form";
import "./dropdown.css";
import Predict from "./component/Predict";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
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
        </Switch>
      </Router>
    </>
  );
}

export default App;
