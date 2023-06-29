import React, { FC } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import style from './Card.module.scss';

import ImgSlider from 'old-components/ImgSlider';
import { active } from 'store/reducers/productPaginateSlice';
import { Stars } from 'ui-kit';

interface CardProps {
  // images?: any;
  // info?: any;
  product?: any;
}
const Card: FC<CardProps> = (props): JSX.Element => {
  const { product } = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // TODO: replace this object using URI-parameters
  const param = {
    product_id: product.id,
    info: {
      name: product.name,
      grade_average: product.grade_average,
      value_price: product.price_include_discount,
      min_quantity: product.min_quantity,
      with_discount: product.with_discount,
      datetime: product.date_added,
      total_reviews: 3,
      total_orders: product.total_orders,
    },
    images: [
      {
        image_url: '$URL',
        serial_number: 0,
      },
    ],
    supplier: null,
  };

  const productClickHandler = (): void => {
    navigate('../product');
    dispatch(active({ ...param, ...{ sum: 0 } }));
  };

  return (
    <div className={style.ard}>
      <ImgSlider srcArr={[product.image_url]} />
      <div
        role="presentation"
        className={style.card_direction}
        onClick={productClickHandler}
      >
        <span>{product.name}</span>
      </div>
      <div className={style.card_price}>
        <div className={style.amount}>${product.price_include_discount}/pc</div>
        <span>{`/from ${product.min_quantity} pcs`}</span>
      </div>
      <Stars reward={+product.grade_average} />
    </div>
  );
};

export default Card;
