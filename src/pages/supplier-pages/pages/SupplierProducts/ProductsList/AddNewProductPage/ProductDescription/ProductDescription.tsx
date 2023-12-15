import React, { FC, useState } from 'react';

import { ArrowIcon } from 'assets/icons';
import { Bundles } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Bundles/Bundles';
import { MainProductInfo } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/MainProductInfo/MainProductInfo';
import { Pricing } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/Pricing';
import { ProductCategory } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/ProductCategory/ProductCategory';
import { Properties } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Properties/Properties';
import { Variation } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Variation/Variation';
import { Paragraph } from 'ui-kit';

import style from './ProductDescription.module.scss';

interface DynamicComponentProps {
  item: string;
}

const DynamicComponent: FC<DynamicComponentProps> = ({ item }) => {
  switch (item) {
    case 'Main Product Info':
      return <MainProductInfo />;
    case 'Product category':
      return <ProductCategory />;
    case 'Properties':
      return <Properties />;
    case 'Variations':
      return <Variation />;
    case 'Bundles':
      return <Bundles />;
    case 'Pricing':
      return <Pricing />;
    default:
      return <p>{item}</p>;
  }
};

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
                style={{ transform: activeItem === index ? 'rotate(180deg)' : '' }}
              />
            </div>
            {activeItem === index && (
              <div className={style.additionalInfo}>
                <DynamicComponent item={item} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
