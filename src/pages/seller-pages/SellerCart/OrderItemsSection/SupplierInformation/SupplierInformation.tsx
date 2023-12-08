import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ArrowRight } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { IProductCardCart, setSelectAllProducts } from 'store/reducers/seller/cart';
import { Checkbox, Paragraph } from 'ui-kit';
import { Star } from 'ui-kit/Stars/Star/Star';

import style from './SupplierInformation.module.scss';

type ISupplierInformation = {
  products: IProductCardCart[];
};

export const SupplierInformation: FC<ISupplierInformation> = ({
  products,
}): JSX.Element => {
  const supplierGradeAverage = products[0].bundle_variation_pod.product.supplier
    .grade_average as number;
  const supplierName = products[0].bundle_variation_pod.product.supplier.company.name;
  const dispatch = useAppDispatch();

  const isSelectAllProducts = products.every(product => product.is_checked);

  const selectAllProducts = (): void => {
    dispatch(
      setSelectAllProducts({
        is_checked: !isSelectAllProducts,
        name: supplierName,
      }),
    );
  };

  return (
    <div className={style.supplier_information}>
      <Checkbox
        variant="default"
        className={style.checkbox_header}
        checked={isSelectAllProducts}
        onChange={selectAllProducts}
      />

      <Star percent={`${supplierGradeAverage * 10}%`} sizes="16" />

      <Paragraph size="s2" className={style.supplier_rating}>
        {supplierGradeAverage}
      </Paragraph>

      <NavLink to="/cart" className={style.supplier_link}>
        <Paragraph size="s2" className={style.supplier_name}>
          {supplierName}
        </Paragraph>

        <ArrowRight className={style.arrow} />
      </NavLink>
    </div>
  );
};
