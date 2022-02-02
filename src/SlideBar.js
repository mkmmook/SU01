import React from "react";
import logo from "./logo.png";
import alert from "./alter.png";

function SlideBar() {
  return (
    <header className="SlideBar">
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
          The prediction result not always hold true, only making use of predictor to facilitate your decision making.
        </div>
      </div>
    </header>
  );
}

export default SlideBar;
