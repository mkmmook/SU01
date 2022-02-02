import React from "react";
import './dropdown.css';

export default function Dropdown({ data }) {
  return (
    <div className="dropdowm">
      <div className="control">
        <div className="select-value">Select Token</div>
        <div className="arrow" />
      </div>
      <div className="options">
        {data.map((token) => (
          <div className="option">{token.symbol}</div>
        ))}
      </div>
    </div>
  );
}
