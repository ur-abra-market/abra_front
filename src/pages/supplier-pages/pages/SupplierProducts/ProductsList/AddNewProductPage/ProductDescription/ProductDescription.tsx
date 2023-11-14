import React, { FC } from 'react';

import { ArrowIcon } from 'assets/icons';
import { Title } from 'ui-kit';

import style from './ProductDescription.module.scss';

export const ProductDescription: FC = (): JSX.Element => {
  const items: string[] = [
    'Main Product Info',
    'Product category',
    'Properties',
    'Variations',
    'Bundles',
    'Pricing',
  ];

  return (
    <div className={style.container}>
      <Title className={style.title}>Product Description</Title>
      <p className={style.paragraph}>Enter the information about your first product</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item}
            <ArrowIcon className={style.arrowIcon} />
          </li>
        ))}
      </ul>
    </div>
  );
};
