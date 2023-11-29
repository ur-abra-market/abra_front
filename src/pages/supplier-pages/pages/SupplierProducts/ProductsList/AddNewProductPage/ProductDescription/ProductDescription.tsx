import React, { FC, useState } from 'react';

import { ArrowIcon } from 'assets/icons';
import { MainProductInfo } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/MainProductInfo/MainProductInfo';
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

  const [activeItem, setActiveItem] = useState<number | null>(null);

  const handleClick = (index: number): void => {
    setActiveItem(activeItem === index ? null : index);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleClick(index);
    }
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>Product Description</h1>
      <Paragraph size="s" className={style.paragraph}>
        Enter the information about your first product
      </Paragraph>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <div
              className={style.list_item}
              onClick={() => handleClick(index)}
              onKeyDown={event => handleKeyDown(index, event)}
              role="button"
              tabIndex={0}
            >
              {item}
              <ArrowIcon
                className={`${style.arrow_icon} ${
                  activeItem === index ? style.active : ''
                }`}
              />
            </div>
            {activeItem === index && (
              <div className={style.additionalInfo}>
                {/* контент для доп.инфо */}
                <p>
                  <MainProductInfo />
                </p>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
