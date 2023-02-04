import React from 'react';

import style from './OrderDetails.module.css';

const OrderDetailsPage = () => {
  return (
    <div className={style.main}>
      <h1 className={style.title}>Order Details</h1>
      <div className={style.orderInfo}>
        <div>
          <h2 className={style.title}>Order No: 4784437395989684</h2>
          <p className={style.date}>20.12.2022</p>
        </div>
        <div className={style.addressInfo}>
          <p className={style.titleAddress}>Shipping Address</p>
          <p className={style.information}>Olga Andreeva, +79158448547</p>
          <p className={style.address}>
            Jaroslava Gasheka 6, building 2, apartment 904, Moscow, Russian Federation,
            589964
          </p>
        </div>
        <div>
          <p className={style.total}>Total: $657 668</p>
        </div>
      </div>

      <ul className={style.productInfo}>
        <li className={style.productInfo__item}>
          <p className={style.seller}>Ningbo Beilun Lonsyne</p>
          <ul className={style.details}>
            <li className={style.item}>
              <div className={style.image} />
              <div className={style.description}>
                <h2>
                  Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
                  Clothes
                </h2>
                <p>Color: Silver</p>
                <p>Status: Shipped</p>
                <div className={style.price}>
                  <p>$780/pc</p>
                  <p>x2</p>
                </div>
              </div>
            </li>

            <li className={style.item}>
              <div className={style.image} />
              <div className={style.description}>
                <h2>
                  Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
                  Clothes
                </h2>
                <p>Color: Silver</p>
                <p>Status: Shipped</p>
                <div className={style.price}>
                  <p>$780/pc</p>
                  <p>x1</p>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default OrderDetailsPage;
