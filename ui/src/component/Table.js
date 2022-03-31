import React, { useState, useEffect } from "react";

const Table = () => {
  const [result, setResult] = useState();
  useEffect(() => {
    fetch("/predict", {method: "GET"}).then((res) =>
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
    <>
      {result &&
        result.map((f) => (
          <tr key={f}>
            <td>{f.Timestamp}</td>
            <td>{f.Actual}</td>
            <td>{f.Predicted}</td>
          </tr>
        ))}
    </>
  );
};

export default Table;
