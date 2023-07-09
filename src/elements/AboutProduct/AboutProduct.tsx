import React, { FC } from 'react';

import style from './AboutProduct.module.scss';

interface IAboutProductProps {
  unknownData?: any;
}

export const AboutProduct: FC<IAboutProductProps> = ({ unknownData }): JSX.Element => {
  return (
    <div className={style.about_product_container}>
      <table className={style.table}>
        <caption className={style.caption}>About the product</caption>
        <tbody>
          {new Array(14).fill({ th: 'Age Group', td: 'Adults' }).map((el, i) => (
            <tr className={style.tr} key={i + 1}>
              <th className={style.th}>{el.th}</th>
              <td className={style.td}>{el.td}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
