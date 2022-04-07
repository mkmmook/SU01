import React, { useState, useEffect } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import alert from "./alter.png";
import axios from "axios";
import "react-datepicker/dist/react-datepicker.css";
import { createMuiTheme } from "@material-ui/core";
import { Row, Col, Container } from "react-bootstrap";

const Form = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectFromDate, handFromDateChange] = useState(new Date());
  const [token, setToken] = useState(" ");
  const [to, setTo] = useState(" ");
  const [from, setFrom] = useState(" ");
  const [a, setA] = useState("");
  const [result, setResult] = useState();

  const muiTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });

  var myParams = {
    data: token,
  };

  // useEffect(() => {
  //   fetch("/predict", { method: "POST" }).then((res) =>
  //     res
  //       .json()
  //       .then((data) => {
  //         console.log(data);
  //         setResult(data);
  //       })
  //       .catch((err) => console.log(err))
  //   );
  // }, []);
  return (
    <header className="body">
      <div className="grid">
        {/* leftside */}
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
            {/* <form onSubmit = {handleSubmit}> */}
            <form>
              <blockquote className="blockquote" class="fs-1">
                <p>Get Started</p>
              </blockquote>
              <div className="input-form">
                <div>
                  Currency<br></br>
                  <small class="text-muted">
                    The selected currency is quoted with U.S. Dollar (USD)
                  </small>
                </div>
                <br></br>
                <div>
                  Select
                  <div className="custom-select">
                    <select
                      onChange={(e) => setToken(e.target.value)}
                      value={token}
                      id="token"
                    >
                      <option label="BTC" name="bitcoin">
                        Bitcoin
                      </option>
                      <option label="BNB" name="ethereum">
                        Binance Coin
                      </option>
                    </select>
                    <div className="linear"></div>
                  </div>
                  <div>
                    Duration<br></br>
                    <small class="text-muted">
                      When the duration change, the prediction is recalculated{" "}
                    </small>
                    <br></br>
                  </div>
                </div>
                <div className="cal">
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
                </div>
              </div>
              <Link>
                {/* <button
                  className="button"
                  onClick={(e) =>
                    runPred(token, selectedDate, selectFromDate, to, from)
                  }
                  type="submit"
                >
                  Predict
                </button> */}
                <button
                  className="button"
                  id="button"
                  onClick={async () => {
                    const inputData = { token, from, to };
                    const res = await fetch("/predict", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify(inputData),
                    })
                      .then((response) => response.json())
                      .then((data) => setToken(data))
                      .catch((error) => console.log(error));
                    // if (res.ok) {
                    //   console.log("response worked!");
                    //   // onNewToken(inputData);
                    //   setToken("");
                    //   setTo("");
                    //   setFrom("");
                    // }
                  }}
                >
                  Predict
                </button>
              </Link>
              {/* {result &&
                result.map((f) => (
                  <tr key={f}>
                    <td>{f.Timestamp}</td>
                    <td>{f.Actual}</td>
                    <td>{f.Predicted}</td>
                  </tr>
                ))} */}
            </form>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Form;
