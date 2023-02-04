import React from 'react';

import PropTypes from 'prop-types';

import style from './CheckItems.module.css';

const CheckItems = ({ index }) => {
  return (
    <div className={style.checkItems}>
      {+index ? <></> : <h4>Items to Order</h4>}
      <div className={style.checkItems__block}>
        <div className={style.checkItems__block_seller}>Ningbo Beilun Lonsyne</div>
        <div className={style.checkItems__block_note}>+ Add a note</div>
      </div>
      <div className={style.checkItems__product}>
        <div className={style.checkItems__product_photo} />
        <div className={style.checkItems__product_info}>
          <div className={style.checkItems__product_info_name}>
            Hot Sale Winter Casual Dresses Drawstring Sweet Hooded Dress Fall Clothes
          </div>
          <div className={style.checkItems__product_info_property}>
            <span>Color: Silver</span>
            <span>Quantity: 100</span>
          </div>
          <div className={style.checkItems__product_info_price}>$780</div>
          <div className={style.checkItems__product_info_offer}>
            Special offer: ≥ 100 = 1pc/$7.80
          </div>
        </div>
      </div>
      <div className={style.checkItems__delivery}>
        <div className={style.checkItems__delivery_info}>Processing time: 14 day</div>
        <div className={style.checkItems__delivery_point} />
        <div className={style.checkItems__delivery_info}>
          Estimated delivery: 27.07.2022
        </div>
        <div className={style.checkItems__delivery_point} />
        <div className={style.checkItems__delivery_info}>
          Delivery method: Abra Shipment
        </div>
      </div>
    </div>
  );
};

CheckItems.propTypes = {
  index: PropTypes.string,
};

export default CheckItems;
