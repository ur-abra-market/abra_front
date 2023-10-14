import React, { FC } from 'react';

import style from './AboutProduct.module.scss';

interface IAboutProductProps {
  unknownData?: any;
}

const fakeInfo = [
  { id: 1, th: 'Age Group', td: 'Adults' },
  { id: 2, th: 'Gender', td: 'Women' },
  { id: 3, th: 'Clothing Type', td: 'Dress' },
  { id: 4, th: 'Dresses Length', td: 'Mini' },
  { id: 5, th: 'Pattern Type', td: 'None' },
  { id: 6, th: 'Decoration', td: 'None' },
  { id: 7, th: 'Weaving method:', td: 'Knitted' },
  { id: 8, th: 'Technics', td: 'Printed' },
  { id: 9, th: 'Model Number', td: 'DD759' },
  { id: 10, th: 'Place of Origin', td: 'Turkey, Istanbul' },
  { id: 11, th: 'Supply Ability', td: '80 0000 Pieces per Month' },
  { id: 12, th: 'Packaging', td: 'Separate package for item' },
  { id: 13, th: 'Material', td: 'Cotton 90%, Elastane 10%' },
  { id: 14, th: 'Style', td: 'Casual, daily' },
  { id: 15, th: 'Season', td: 'Spring-Summer' },
];

export const AboutProduct: FC<IAboutProductProps> = ({ unknownData }): JSX.Element => {
  return (
    <div className={style.about_product_container}>
      <table className={style.table}>
        <caption className={style.caption}>About the product</caption>
        <tbody>
          {fakeInfo.map((el, i) => (
            <tr className={style.tr} key={el.id}>
              <th className={style.th}>{el.th}</th>
              <td className={style.td}>{el.td}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
