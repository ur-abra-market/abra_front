import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { IProductCardInCart, setSelectAllProducts } from 'store/reducers/seller/cart';
import { Checkbox, Paragraph } from 'ui-kit';
import { Star } from 'ui-kit/Stars/Star/Star';

import style from './SupplierInformation.module.scss';

type ISupplierInformation = {
  products: IProductCardInCart[];
  isCheckoutPage?: boolean;
};

export const SupplierInformation: FC<ISupplierInformation> = ({
  products,
  isCheckoutPage,
}): JSX.Element => {
  const dispatch = useAppDispatch();

  const supplierAverage = products[0].bundle_variation_pod.product.supplier
    .grade_average as number;
  const supplierName = products[0].bundle_variation_pod.product.supplier.company.name;
  const averagePercent = supplierAverage * 10;

  const isSelectedAllProducts = products.every(product => product.isChecked);

  const selectAllProducts = (): void => {
    dispatch(
      setSelectAllProducts({
        isChecked: !isSelectedAllProducts,
        name: supplierName,
      }),
    );
  };

  return (
    <div className={style.header_item}>
      <div className={style.supplier_container}>
        {!isCheckoutPage && (
          <Checkbox
            variant="default"
            className={style.checkbox_header}
            checked={isSelectedAllProducts}
            onChange={selectAllProducts}
          />
        )}

        <div
          className={`${style.supplier_information} ${
            isCheckoutPage && style.is_checkout_page
          }`}
        >
          <div className={style.rating}>
            <Star percent={`${averagePercent}%`} sizes="16" />
          </div>

          <Paragraph size="s2" className={style.supplier_rating}>
            {supplierAverage}
          </Paragraph>

          <NavLink to="/cart" className={style.supplier_link}>
            {/* todo link supplier in NavLink */}
            <Paragraph size="s2" className={style.supplier_name}>
              {supplierName}
            </Paragraph>

            <ArrowIcon className={style.arrow} />
          </NavLink>
        </div>
      </div>
    </div>
  );
};
