import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import Dropdown from "./dropdown";
import data from "./Data.json";

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

function Form(props) {
  const [selectedDate, handleDateChange] = useState(new Date());
  return (
    <header className="body">
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
            <div>
              Select<br></br>
              <div class="dropdown">
                <a
                  class="btn btn-secondary dropdown-toggle"
                  href="#"
                  role="button"
                  id="dropdownMenuLink"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dropdown link
                </a>

                <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <li>
                    <a class="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a class="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </div>{" "}
              <div className="linear"></div>
            </div>
            <div>
              Duration<br></br>
              <small class="text-muted">
                When the duration change, the prediction is recalculated{" "}
              </small>
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
                <KeyboardDatePicker
                  placeholder="2018/10/10"
                  value={selectedDate}
                  onChange={(date) => handleDateChange(date)}
                  format="yyyy/MM/dd"
                  label="To"
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>{" "}
            <div style={{ width : 200}}>
              <Dropdown data={data} />
            </div>
          </div>
          <button className="button">Predict</button>
        </div>
      </div>
    </header>
  );
}

export default Form;
