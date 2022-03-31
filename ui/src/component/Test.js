import { useState, useEffect } from "react";
import APIService from "./APIService";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import alert from "./alter.png";

const Form = (props) => {
  const [token, setToken] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [result, setResult] = useState();

  const insertArticle = () => {
    APIService.InsertArticle({ token, from, to })
      .then((response) => props.insertedArticle(response))
      .catch((error) => console.log("error", error));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    insertArticle();
    setToken("");
    setTo("");
    setFrom("");
  };

  useEffect(() => {
    fetch("/predict", { method: "GET" }).then((res) =>
      res
        .json()
        .then((data) => {
          console.log(data);
          setResult(data);
        })
        .catch((err) => console.log(err))
    );
  }, []);

  return (
    <div className="grid">
      <div className="SlideBar">
        <img src={logo} className="App-logo" alt="logo" />
        <figure class="text-center">
          <blockquote className="blockquote" class="fs-1">
            <p>Cryptocurrency Quantitative Analysis System</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            It might take a couple of minutes for the prediction process.
          </figcaption>
        </figure>
        <div className="box-left">
          <img src={alert} className="App-alert" alt="logo" />
          <div>
            <p className="blod">Please use at your own risk</p>
            The prediction result not always hold true, only making use of
            predictor to facilitate your decision making.
          </div>
        </div>
      </div>
      <div className="col-8">
        <div className="container-right">
          <form onSubmit={handleSubmit}>
          <blockquote className="blockquote" class="fs-1">
                <p>Get Started</p>
              </blockquote>
                <div>
                  Currency<br></br>
                  <small class="text-muted">
                    The selected currency is quoted with U.S. Dollar (USD)
                  </small>
                </div>
                <br></br>
            <label htmlFor="body" className="form-label">
              Currency
            </label>
            <input
              className="form-control"
              placeholder="currency"
              rows="6"
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
            ></input>
            <label htmlFor="body" className="form-label">
              From
            </label>
            <input
              className="form-control"
              placeholder="from"
              rows="6"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              required
            ></input>
            <label htmlFor="body" className="form-label">
              To
            </label>
            <input
              className="form-control"
              placeholder="to"
              rows="6"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
            ></input>
            <button className="btn btn-primary mt-2 ">predict</button>
            <Link to="/Predict">&nbsp;
              <button className="btn btn-primary mt-2 float-right">see result</button>
            </Link>
          </form>{" "}
        </div>
      </div>
    </div>
  );
};

export default Form;
