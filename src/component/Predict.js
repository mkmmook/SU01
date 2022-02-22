import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const Predict = (props) => {
  const [APIData, setAPIData] = useState([]);
  useEffect(() => {
    axios
      .get(`https://60fbca4591156a0017b4c8a7.mockapi.io/fakeData`)
      .then((response) => {
        setAPIData(response.data);
      });
  }, []);
  return (
    <header className="Body">
      {APIData.map((data) => {
        return (
          <>
            <tr>{data.token}</tr>
            <tr>{data.selectedDate}</tr>
            <tr>{data.selectFromDate}</tr>
          </>
        );
      })}{" "}
    </header>
  );
};

export default Predict;
