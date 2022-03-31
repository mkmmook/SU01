import "./App.css";
import React, { useState } from "react";
import Form from "./component/Form";
import Test from "./component/Test";
import Predict from "./component/Predict";
import Table from "./component/Table";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  const [articles, setArticles] = useState([]);
  const insertedArticle = (article) => {
    const new_articles = [...articles, article];
    setArticles(new_articles);
  };
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
          <Route path="/Test" exact>
            <Test />
          </Route>
          <Route path="/Table" exact>
            <Table />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
