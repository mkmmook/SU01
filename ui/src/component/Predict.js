import React, { useState, useEffect } from "react";
import axios from "axios";

const Predict = (props) => {
  const [APIData, setAPIData] = useState([]);
  const [result, setResult] = useState(" ");
  useEffect(() => {
    axios
      .get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);

  useEffect(() => {
    const res = fetch("/Predict", {
      method: "POST",
    });
    if (res.status === 200) {
      const text = res.text();
      setResult(text);
    } else {
      setResult("Error from API.");
    }  
  },[]);
  return (
    <header className="Body">
      {APIData.map((data) => {
        return (
          <>
            <tr>{data.token}</tr>
            <tr>{data.selectedDate}</tr>
            <tr>{data.selectFromDate}</tr>
            <tr>{result}</tr>
          </>
        );
      })}{" "}
      <tr></tr>
    </header>
  );
};

export default Predict;
