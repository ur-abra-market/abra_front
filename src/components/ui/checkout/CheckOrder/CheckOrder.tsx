import React from 'react';

import { useNavigate } from 'react-router-dom';

import { ReactComponent as Lock } from '../../../../assets/img/icons/lock.svg';
import { Button } from '../../../ui-kit';

import style from './CheckOrder.module.css';

const CheckOrder = (): JSX.Element => {
  const navigate = useNavigate();
  const onClickNavigate = (): void => {
    return navigate('/checkout-success');
  };

  return (
    <div className={style.check_order}>
      <div className={style.check_order_title}>
        <span className={style.check_order_title_text}>Items to Order</span>
        <span className={style.check_order_title_text}>400</span>
      </div>
      <div className={style.check_order_price}>
        <span className={style.check_order_goods_cost}>Goods Cost</span>
        <span className={style.line} />
        <span className={style.check_order_goods_cost}>$780</span>
      </div>
      <div className={style.check_order_shipping}>
        <span className={style.check_order_goods_cost}>Shipping~</span>
        <span className={style.line} />
        <span className={style.check_order_goods_cost}>$220</span>
      </div>
      <div className={style.check_order_note}>
        * The final cost will be calculated after you add an address
      </div>
      <div className={style.line_two} />
      <div className={style.check_order_total}>
        <div>Total</div>
        <div>$1000</div>
      </div>
      <Button label="Place Order" onClick={onClickNavigate} />
      <div className={style.check_order_text}>
        Please make sure the information entered is correct before proceeding.
      </div>
      <div className={style.check_order_security}>
        <Lock className={style.check_order_security_lock} />
        <span className={style.check_order_security_text}>
          Your data and orders are secured
        </span>
      </div>
    </div>
  );
};

export default CheckOrder;
