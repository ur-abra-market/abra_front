import React, { CSSProperties, FC, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { changeById } from '../../store/reducers/basketSlice';
import { active } from '../../store/reducers/productPaginateSlice';
import { BtnNewBest } from '../buttons';
import ImgSlider from '../ImgSlider';
import ProductQuantityControl from '../ProductQuantityControl';
import Stars from '../Stars';
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

  const handlerBasket = () => {
    setSum(100);
    propsNew.sum = 100;
    const newObj = propsNew;

    dispatch(changeById({ newObj }));
  };

  return (
    <div className={style.cardFull}>
      <ImgSlider srcArr={propsNew.images} />
      <div className={style.cardFull__info}>
        <div className={style.cardFull__block1}>
          <div className={style.cardFull__direction}>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
            <h4
              onClick={() => {
                navigate('../product');
                dispatch(active(propsNew));
              }}
            >
              {propsNew.info.name}
            </h4>
            <BtnNewBest name="Bestseller" />
          </div>
          <ProductPath pathArr={[]} />
        </div>
        <div className={style.cardFull__block2}>
          <div
            className={style.cardFull__price_stars}
            style={propsNew.sum === 0 ? style1 : style2}
          >
            <ProductPrice
              price={propsNew.info.value_price}
              quantity={propsNew.info.quantity}
            />
            <div className={style.cardFull__stars_reviews}>
              <Stars reward={+propsNew.info.grade_average} />
              <span>{`/${propsNew.info.total_reviews} reviews`}</span>
            </div>
          </div>
          <div
            className={style.cardFull__orders}
          >{`${propsNew.info.total_orders} Orders`}</div>
        </div>
        <div className={style.cardFull__block3}>
          {propsNew.sum > 0 ? (
            <ProductQuantityControl obj={propsNew} />
          ) : (
            <div
              role="presentation"
              className={style.cardFull__basket}
              onClick={() => handlerBasket()}
            >
              <div />
            </div>
          )}
          <SupplierCard supplier={propsNew.supplier} />
        </div>
      </div>
    </div>
  );
};

export default CardFull;
