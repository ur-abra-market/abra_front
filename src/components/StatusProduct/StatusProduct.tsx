import React, { useState } from 'react';

import { useDispatch } from 'react-redux';

import { status } from '../../store/reducers/productSlice';

import style from './StatusProduct.module.css';

const StatusProduct = () => {
  const statusArr = ['Bestsellers', 'New Arrivals', 'Highest Rating', 'Hot Deals'];
  const productArr = ['bestsellers', 'new', 'rating', 'hot'];
  const dispatch = useDispatch();
  const [check, setCheck] = useState([true, false, false, false, false]);

  const handleCheck = index => {
    const arr = Array(statusArr.length)
      .fill(false)
      .map((el, i) => i === index);

    setCheck(arr);
    dispatch(status(productArr[index]));
  };

  return (
    <div className={style.statusProduct}>
      {statusArr.map((btn, i) => (
        <div className={style.statusProduct__btn} key={`sort-btn-${i}`}>
          <div className={style.statusProduct__btn_name} onClick={() => handleCheck(i)}>
            {btn}
          </div>
          <div
            className={
              check[i]
                ? `${`${style.statusProduct__btn_check} ${style.sort_active}`}`
                : `${style.sort__btn_check}`
            }
          />
        </div>
      ))}
    </div>
  );
};

export default StatusProduct;
