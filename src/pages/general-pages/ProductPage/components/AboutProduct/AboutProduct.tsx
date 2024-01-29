import React, { FC } from 'react';

import { propertyInfoHelper } from './helper/propertyInfoHelper';

import { IProductProperty } from 'store/reducers/productSlice/types';

import style from './AboutProduct.module.scss';

interface IAboutProductProps {
  propertyInfo: IProductProperty[];
}

export const AboutProduct: FC<IAboutProductProps> = ({ propertyInfo }): JSX.Element => {
  return (
    <div className={style.section}>
      <table className={style.table}>
        <caption className={style.caption}>About the product</caption>
        <tbody>
          {propertyInfo.map(el => (
            <tr className={style.tr} key={el.id}>
              <th className={style.th}>{el.name}</th>
              <td className={style.td}>{propertyInfoHelper(el.values)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
