import React, { FC } from 'react';

import { ArrowIcon } from 'assets/icons';
import { Paragraph } from 'ui-kit';

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
      <h1 className={style.title}>Product Description</h1>
      <Paragraph size="s" className={style.paragraph}>
        Enter the information about your first product
      </Paragraph>
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
