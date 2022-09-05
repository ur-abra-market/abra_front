import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { status } from '../../../store/reducers/productSlice';
import "./StatusProduct.css";

const StatusProduct = () => {
  const statusArr = [
    "Bestsellers",
    "New Arrivals",
    "Highest Rating",
    "Hot Deals",
    "Popular now",
  ];
  const productArr = [
    "bestsellers",
    "new",
    "rating",
    "hot",
    "popular",
  ];
  const dispatch = useDispatch();
  const [check, setCheck] = useState([true, false, false, false, false]);

  const handleCheck = (index) => {
    const arr = Array(statusArr.length)
      .fill(false)
      .map((el, i) => (i === index ? true : false));
    setCheck(arr);  
    dispatch(status(productArr[index]));   
  };
  return (
    <div className="StatusProduct">
      {statusArr.map((btn, i) => (
        <div className="StatusProduct__btn" key={`sort-btn-${i}`}>
          <div className="StatusProduct__btn_name" onClick={() => handleCheck(i)}>
            {btn}
          </div>
          <div
            className={
              check[i] ? "StatusProduct__btn_check sort-active" : "Sort__btn_check"
            }
          ></div>
        </div>
      ))}
    </div>
  );
};

export default StatusProduct;
