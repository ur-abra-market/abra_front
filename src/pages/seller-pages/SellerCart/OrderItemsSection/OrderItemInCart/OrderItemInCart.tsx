import React, { FC } from 'react';

import { ItemDescription } from './ItemDescription';
import { Quantity } from './Quantity';

import { useAppDispatch } from 'common/hooks';
import { IProductInCart, setSelectProduct } from 'store/reducers/seller/cart';
import { Checkbox } from 'ui-kit';

import style from './OrderItemInCart.module.scss';

interface IOrderItemInCart {
  product: IProductInCart;
  amount: number;
  is_checked: boolean;
}

export const OrderItemInCart: FC<IOrderItemInCart> = ({
  product,
  amount,
  is_checked,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const onCheckedProductHandler = (id: number | null): unknown =>
    dispatch(setSelectProduct({ id }));

  return (
    <li className={style.order_list_item}>
      <Checkbox
        variant="default"
        checked={is_checked}
        onChange={() => onCheckedProductHandler(product.id)}
      />

      <div className={style.product_info}>
        <ItemDescription product={product} amount={amount} />
        <Quantity amount={amount} />
      </div>
    </li>
  );
};
