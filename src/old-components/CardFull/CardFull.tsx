import React, { CSSProperties, FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from '../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../common/hooks/useAppSelector';
import { changeById } from '../../store/reducers/basketSlice';
import { active } from '../../store/reducers/productPaginateSlice';
import { Stars } from '../../ui-kit';
import ImgSlider from '../ImgSlider';
import ProductQuantityControl from '../ProductQuantityControl';
import ProductPath from '../ui/product/ProductPath';
import ProductPrice from '../ui/product/ProductPrice';
import SupplierCard from '../ui/product/SupplierCard';

import style from './CardFull.module.css';

interface CardFullProps {
  props: any;
  product_id?: string;
}
const CardFull: FC<CardFullProps> = ({ props }): JSX.Element => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const basket = useAppSelector(state => state.basket.basketProduct);
  const product = basket.find(obj => obj.product_id === props.product_id);

  const [sum, setSum] = useState(0);
  const propsNew = product || { ...props, ...{ sum } };

  const style1: CSSProperties = {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: '0px',
  };
  const style2: CSSProperties = {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px',
  };

  const handlerBasket = (): void => {
    setSum(100);
    propsNew.sum = 100;
    const newObj = propsNew;

    dispatch(changeById({ newObj }));
  };

  return (
    <div className={style.card_full}>
      <ImgSlider srcArr={propsNew.images} />
      <div className={style.card_full_info}>
        <div className={style.card_full_block1}>
          <div className={style.card_full_direction}>
            <button
              type="button"
              onClick={() => {
                navigate('../product');
                dispatch(active(propsNew));
              }}
            >
              {propsNew.info.name}
            </button>
          </div>

          <div className="button_new_best">Bestseller</div>
        </div>
        <ProductPath pathArr={[]} />
      </div>
      <div className={style.card_full_block2}>
        <div
          className={style.card_full_price_stars}
          style={propsNew.sum === 0 ? style1 : style2}
        >
          <ProductPrice
            price={propsNew.info.value_price}
            quantity={propsNew.info.quantity}
          />
          <div className={style.card_full_stars_reviews}>
            <Stars reward={+propsNew.info.grade_average} />
            <span>{`/${propsNew.info.total_reviews} reviews`}</span>
          </div>
        </div>
        <div
          className={style.card_full_orders}
        >{`${propsNew.info.total_orders} Orders`}</div>
      </div>
      <div className={style.card_full_block3}>
        {propsNew.sum > 0 ? (
          <ProductQuantityControl obj={propsNew} />
        ) : (
          <div
            role="presentation"
            className={style.card_full_basket}
            onClick={() => handlerBasket()}
          >
            <div />
          </div>
        )}
        <SupplierCard supplier={propsNew.supplier} />
      </div>
    </div>
  );
};

export default CardFull;
