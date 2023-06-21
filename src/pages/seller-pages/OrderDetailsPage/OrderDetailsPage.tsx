import React from 'react';

import { Link } from 'react-router-dom';

import Header from '../../../layouts/Header';

import style from './OrderDetails.module.css';

import { Footer } from 'layouts/Footer';

export const OrderDetailsPage = (): JSX.Element => {
  return (
    <>
      <Header />
      <div className={style.wrapper}>
        <div className={style.main}>
          <div className={style.order_details}>
            <h1 className={style.title}>Order Details</h1>
            <div className={style.order_info}>
              <div className={style.order_info_item}>
                <p>Status:</p>
                <p>Preparing</p>
              </div>
              <div className={style.order_info_item}>
                <p>Order date and time:</p>
                <p>12 Aug 2022 at 9:12 PM</p>
              </div>
              <div className={style.order_info_item}>
                <p>Order No:</p>
                <p>4784437395989684</p>
              </div>
              <div className={style.order_info_item}>
                <p>Total:</p>
                <p>$2,000.00</p>
              </div>
            </div>
            <div className={style.quantity}>2 Delivery</div>
          </div>

          <ul className={style.order_list}>
            <li className={style.order_list_item}>
              <div className={style.product_info}>
                <div className={style.name}>
                  {/* <img src='' /> */}
                  <p>4.1</p>
                  <p>Ningbo Beilun Lonsyne</p>
                  <span className={style.arrow} />
                </div>
                <div className={style.description}>
                  <div className={style.image} />
                  <div>
                    <h2>
                      Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
                      Clothes
                    </h2>
                    <div className={style.properties}>
                      <p>Color: Silver</p>
                      <p>Status: Shipped</p>
                      <p>Quantity: 200</p>
                    </div>
                    <div className={style.price}>
                      <p>$780</p>
                      <div className={style.price_details}>
                        <p>300pcs</p>
                        <span className={style.line} />
                        <p className={style.old_price}>$4.2/1pcs</p>
                        <p className={style.new_price}>$4.0/1pcs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.track_info}>
                <p>
                  Track No: <Link to="/#">JKFRIU548694LLJE</Link>
                </p>
                <span />
                <p>Estimated delivery: 27.07.2022</p>
                <span />
                <p>Delivery method: Abra Shipment</p>
              </div>
            </li>
            <li className={style.order_list_item}>
              <div className={style.product_info}>
                <div className={style.name}>
                  {/* <img src='' /> */}
                  <p>4.1</p>
                  <p>Ningbo Beilun Lonsyne</p>
                  <span className={style.arrow} />
                </div>
                <div className={style.description}>
                  <div className={style.image} />
                  <div>
                    <h2>
                      Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall
                      Clothes
                    </h2>
                    <div className={style.properties}>
                      <p>Color: Silver</p>
                      <p>Status: Shipped</p>
                      <p>Quantity: 200</p>
                    </div>
                    <div className={style.price}>
                      <p>$780</p>
                      <div className={style.price_details}>
                        <p>300pcs</p>
                        <span className={style.line} />
                        <p className={style.old_price}>$4.2/1pcs</p>
                        <p className={style.new_price}>$4.0/1pcs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={style.track_info}>
                <p>
                  Track No: <Link to="/#">JKFRIU548694LLJE</Link>
                </p>
                <span />
                <p>Estimated delivery: 27.07.2022</p>
                <span />
                <p>Delivery method: Abra Shipment</p>
              </div>
            </li>
          </ul>

          <div className={style.other_info}>
            <div className={style.delivery_info}>
              <h2>Delivery Info</h2>
              <p className={style.seller}>Olga Andreeva, +79158448547</p>
              <div className={style.line_b} />
              <p className={style.address}>
                Jaroslava Gasheka 6, building 2, apartment 904, Moscow, Russian
                Federation, 589964
              </p>
              <p className={style.delivery_description}>
                * The address cannot be changed because the order has already been shipped
              </p>
            </div>
            <div className={style.price_info}>
              <div className={style.total_count}>
                <p>Items to Order</p>
                <p>400</p>
              </div>
              <div className={style.total_price_item}>
                <p>Goods Cost</p>
                <span className={style.line2} />
                <p>$1560</p>
              </div>
              <div className={style.total_price_item}>
                <p>Shipping</p>
                <span className={style.line2} />
                <p>$560</p>
              </div>
              <div className={style.price_description}>
                * This is the final shipping cost
              </div>
              <div className={style.line_b} />
              <div className={style.total_price}>
                <p>Total</p>
                <p>$2120</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer variant="default" />
    </>
  );
};
