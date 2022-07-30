import React, { useState } from "react";
import "./Sort.css";

const Sort = () => {
  const sortArr = [
    "Bestsellers",
    "New Arrivals",
    "Highest Rating",
    "Hot Deals",
    "Popular now",
  ];
  const [check, setCheck] = useState([true, false, false, false, false]);
  const handleCheck = (index) => {
    const arr = Array(sortArr.length)
      .fill(false)
      .map((el, i) => (i === index ? true : false));
    setCheck(arr);
  };
  return (
    <div className="Sort">
      {sortArr.map((btn, i) => (
        <div className="Sort__btn" key={`sort-btn-${i}`}>
          <div className="Sort__btn_name" onClick={() => handleCheck(i)}>
            {btn}
          </div>
          <div
            className={
              check[i] ? "Sort__btn_check sort-active" : "Sort__btn_check"
            }
          ></div>
        </div>
      ))}
    </div>
  );
};

export default Sort;
