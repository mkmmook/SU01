import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";

const Predict = (props) => {
  const [APIData, setAPIData] = useState([]);
  const [result, setResult] = useState();
  const [lineChart, setLineChart] = useState();

  const ctx = document.getElementById("myChart").getContext("2d");
  const gradientStroke1 = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke1.addColorStop(0, "#F78576");
  gradientStroke1.addColorStop(0.5, "#E434D1");
  gradientStroke1.addColorStop(1, "#E5479F");
  const gradientStroke2 = ctx.createLinearGradient(500, 0, 100, 0);
  gradientStroke2.addColorStop(1, "#00FF42");
  gradientStroke2.addColorStop(0.5, "#4DB9F7");
  gradientStroke2.addColorStop(0, "#4DA1FF");


  useEffect(() => {
    fetch("/predict", { method: "GET" }).then((res) =>
      res
        .json()
        .then((data) => {
          console.log(data);
          setResult(data);
          setLineChart({
            labels: data && data.map((crypto) => crypto.Timestamp),
            datasets: [
              {
                data: data && data.map((crypto) => crypto.Actual),
                borderColor: gradientStroke1,
                pointBorderColor: gradientStroke1,
                pointBackgroundColor: gradientStroke1,
                pointHoverBackgroundColor: gradientStroke1,
                pointHoverBorderColor: gradientStroke1,
                pointBorderWidth: 5,
                pointHoverRadius: 1,
                pointHoverBorderWidth: 1,
                pointRadius: 0.5,
                fill: false,
                borderWidth: 2,
                label: "Actuals",
              },
              {
                data: data && data.map((crypto) => crypto.Predicted),
                fill: false,
                borderColor: gradientStroke2,
                pointBorderColor: gradientStroke2,
                pointBackgroundColor: gradientStroke2,
                pointHoverBackgroundColor: gradientStroke2,
                pointHoverBorderColor: gradientStroke1,
                pointBorderWidth: 5,
                pointHoverRadius: 1,
                pointHoverBorderWidth: 1,
                pointRadius: 0.5,
                label: "Predicted",
              },
            ],
            options: {
              legend: {
                position: "bottom",
              },
              scales: {
                yAxes: [
                  {
                    ticks: {
                      display: false,
                      beginAtZero: true,
                      maxTicksLimit: 5,
                    },
                    gridLines: {
                      display: false,
                    },
                  },
                ],
                xAxes: [
                  {
                    gridLines: {
                      display: false,
                    },
                    ticks: {
                      display: false,
                    },
                  },
                ],
              },
            },
          });
        })
        .catch((err) => console.log(err))
    );
  }, []);

  return (
    
    <header className="Body">
      <Link to="/Test">
        <button className="back" type="submit">
          {" "}
          <svg
            width="7"
            height="13"
            viewBox="0 0 7 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.72777 0.178482C6.94411 0.394823 6.96378 0.733363 6.78677 0.971922L6.72777 1.04027L1.47144 6.29688L6.72777 11.5535C6.94411 11.7698 6.96378 12.1084 6.78677 12.3469L6.72777 12.4153C6.51143 12.6316 6.17289 12.6513 5.93433 12.4743L5.86598 12.4153L0.178481 6.72777C-0.0378608 6.51143 -0.0575284 6.17289 0.119478 5.93433L0.178481 5.86598L5.86598 0.178482C6.10396 -0.059494 6.48979 -0.059494 6.72777 0.178482Z"
              fill="#E2D8FD"
            />
          </svg>
        </button>
      </Link>
      <div className="CryptoPair">
        {" "}
        {/* {result &&
          result.map((data) => {
            return <tr>{data}</tr>;
          })}{" "} */}
        ETH/USD
      </div>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <br></br>
        <figcaption className="blockquote-footer">
          It might take a couple of minutes for the prediction process.
        </figcaption>
      </div>
      <img src={logo} className="logo" alt="logo" />
      <div>
        <div className="percent">PERCENTAGE ERROR</div>
        <div className="color1">
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.98609 1.39058C7.43512 0.00861163 9.39023 0.00860965 9.83926 1.39058L10.7701 4.25532C10.9709 4.87336 11.5468 5.2918 12.1967 5.2918H15.2088C16.6619 5.2918 17.2661 7.15122 16.0905 8.00532L13.6536 9.77583C13.1279 10.1578 12.9079 10.8348 13.1087 11.4529L14.0395 14.3176C14.4885 15.6996 12.9068 16.8488 11.7313 15.9947L9.29436 14.2242C8.76863 13.8422 8.05673 13.8422 7.531 14.2242L5.0941 15.9947C3.91853 16.8488 2.33681 15.6996 2.78584 14.3176L3.71665 11.4529C3.91746 10.8348 3.69748 10.1578 3.17174 9.77583L0.734848 8.00532C-0.440722 7.15122 0.163441 5.2918 1.61653 5.2918H4.6287C5.27853 5.2918 5.85447 4.87336 6.05528 4.25532L6.98609 1.39058Z"
                fill="#F5E023"
              />
            </svg>
        </div>
        <div className="model">MODEL ACCURACY</div>
        <div className="color2"/>
      </div>{" "}
      <div className="content">
        {/* <Line data={lineChart} /> */}
        <>
          <br></br>
          <div className="panel-body table-responsive">
            <tbody>
              <tr class="header">
                <th>Timestamp</th>
                <th>Actual</th>
                <th>Predicted</th>
              </tr>
              {result &&
                result.map((f) => (
                  <tr key={f}>
                    <td>{f.Timestamp}</td>
                    <td>{f.Actual}</td>
                    <td>{f.Predicted}</td>
                  </tr>
                ))}
            </tbody>
          </div>
        </>
      </div>
    </header>
  );
};
export default Predict;
