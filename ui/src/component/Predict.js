import React, {  useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import logo from "./logo.png";
import { Link } from "react-router-dom";
import { Chart as ChartJS } from "chart.js/auto";

const Predict = () => {
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
    axios
      .get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
      .then((response) => {
        setAPIData(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    fetch("/predict", {method: "GET"}).then((res) =>
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
          setLineChart.refresh()
        })
        .catch((err) => console.log(err))
    );
  }, []);

  return (
    <header className="Body">
      <Link to="/">
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
        {/* {APIData.map((data) => {
          return <tr>Token: {data.token}</tr>;
        })}{" "} */}
        BNB/USD
      </div>
      <div className="dashboard">
        <h2>Dashboard</h2>
        <br></br>
        <figcaption className="blockquote-footer">
          It might take a couple of minutes for the prediction process.
        </figcaption>
      </div>
      <img src={logo} className="logo" alt="logo" />
      <div className="content">
        <Line data={lineChart} />
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