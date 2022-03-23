import React, { useState } from "react";
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
import { createMuiTheme } from '@material-ui/core'

const Form = (props) => {
  const [selectedDate, handleDateChange] = useState(new Date());
  const [selectFromDate, handFromDateChange] = useState(new Date());
  const [token, setToken] = useState(" ");
  const muiTheme = createMuiTheme({
    palette: {
      type: "dark"
    }
  })
  const runPred = async (token, selectedDate, selectFromDate) => {
    const res = await axios.post(
      `https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`,
      {
        token,
        selectedDate,
        selectFromDate,
      }
    );
    console.log(res);
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
                    <ThemeProvider theme={muiTheme}>
                      <KeyboardDatePicker
                        clearable
                        value={selectedDate}
                        format="MM/dd/yyyy"
                        onChange={(date) => handleDateChange(date)}
                        format="MM/dd/yyyy"
                        label="From"
                        style={{width:"46%"}}
                      />
                      &emsp;
                      <KeyboardDatePicker
                        clearable
                        value={selectFromDate}
                        placeholder="selectdate"
                        onChange={(date) => handFromDateChange(date)}
                        format="MM/dd/yyyy"
                        label="To"
                        style={{width:"46%"}}

                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>{" "}
                </div>
              </div>
              <Link to="/Predict">
                <button
                  className="button"
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
