import React, { useState, CSSProperties, useEffect } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
// import Select from "react-select";
import { Link } from "react-router-dom";
import logo from "./logo.png";
import alert from "./alter.png";
import axios from "axios";
import { BrowserRouter as Router, Route } from "react-router-dom";

const Form = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectFromDate, handFromDateChange] = useState(new Date());
  const [token, setToken] = useState(" ");
  const [prediction,setPrediction] = useState();

  const runPred = async (token, selectedDate, selectFromDate) =>{
    const res = await axios.post(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`, {
      token,
      selectedDate,
      selectFromDate,
    });
    console.log(res)
  }
  const materialTheme = createMuiTheme({
    overrides: {
      MuiPickersToolbar: {
        toolbar: {
          backgroundColor: "#16162a",
          color: "#16162a",
        },
      },
      MuiPickersCalendarHeader: {
        switchHeader: {
          backgroundColor: "white",
          color: "#1b5e20",
        },
      },
    },
  });

  const handleChange = (e) => {
    setToken(e.target.value);
  };

  return (
    <header className="body">
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
            <div>
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
                    <select onChange={(e) => setToken(e.target.value)}>
                      <option label="BTC" name="Bitcoin">
                        Bitcoin
                      </option>
                      <option label="BNB" name="Binance Coin">
                        Binance Coin
                      </option>
                    </select>
                    {/* <Select
                      id="select"
                      options={options}
                      onChange={handleChange}
                    /> */}
                    {/* <span style={groupBadgeStyles}>{data.options.length}</span> */}
                    <div className="linear"></div>
                  </div>
                  <div>
                    Duration<br></br>
                    <small class="text-muted">
                      When the duration change, the prediction is recalculated{" "}
                    </small>
                    <br></br>
                    <br></br>
                  </div>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <ThemeProvider theme={materialTheme}>
                      <KeyboardDatePicker
                        clearable
                        value={selectedDate}
                        placeholder="10/10/2018"
                        onChange={(date) => handleDateChange(date)}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                        label="From"
                      />
                      &emsp;
                      <KeyboardDatePicker
                        clearable
                        value={selectFromDate}
                        placeholder="10/10/2018"
                        onChange={(date) => handFromDateChange(date)}
                        minDate={new Date()}
                        format="MM/dd/yyyy"
                        label="To"
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>{" "}
                </div>
              </div>
              <Link to="/Predict">
                <button
                  className="button"
                  // onClick={() => history.push("/Predict")}
                  onClick={(e) => runPred(token, selectedDate, selectFromDate)}
                  type="submit"
                >
                  Predict
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Form;
