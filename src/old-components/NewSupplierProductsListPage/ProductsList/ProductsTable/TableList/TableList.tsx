import React, { FC, useEffect } from 'react';

import style from './TableList.module.scss';

import defaultImg from 'assets/images/files/default-product-image.png';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { manageProductsSelector } from 'store/reducers/productSlice/selectors';
import { manageProductsService } from 'store/reducers/productSlice/thunks';
import { IProductsListRequest } from 'store/reducers/productSlice/types';
import { Checkbox } from 'ui-kit';

export const TableList: FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(manageProductsSelector);

  // делаем копию массива products
  const testProductsArray = (): IProductsListRequest[] | undefined => {
    if (products?.length) {
      return [...products];
    }
  };

  // тестовый массив для отрисовки из 20 элементов
  const array = testProductsArray()?.splice(0, 20);

  console.log(array);

  useEffect(() => {
    dispatch(manageProductsService());
  }, [dispatch]);

  return (
    <tbody>
      {array?.map(el => (
        <tr className={style.table_row} key={el.id}>
          <td className={style.table_head}>
            <Checkbox variant="default" />
          </td>
          <td className={style.table_head}>{el.id}</td>
          <td>
            <img className={style.image} src={defaultImg} alt="product" />
          </td>
          <td className={style.table_head}>{el.name}</td>
          <td className={style.table_head}>{el.datetime}</td>

          {el.prices.map(item => (
            <React.Fragment key={item.id}>
              <td className={style.table_head}>{item.discount}</td>
              <td className={style.table_head}>{item.value}</td>
              <td className={style.table_head}>Balance,units</td>
            </React.Fragment>
          ))}

          <td className={style.table_head}>{el.is_active ? 'Visible' : 'Hidden'}</td>
        </tr>
      ))}
    </tbody>
  );
};
