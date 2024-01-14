import React, { FC, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { Bundles } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Bundles/Bundles';
import { MainProductInfo } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/MainProductInfo/MainProductInfo';
import { Pricing } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Pricing/Pricing';
import { ProductCategory } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/ProductCategory/ProductCategory';
import { Properties } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Properties/Properties';
import { Variation } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/Variation/Variation';
import { Paragraph, Title } from 'ui-kit';

import style from './ProductDescription.module.scss';

enum DescriptionLabel {
  MainProductInfo = 'Main Product Info',
  ProductCategory = 'Product Category',
  Properties = 'Properties',
  Variations = 'Variations',
  Bundles = 'Bundles',
  Pricing = 'Pricing',
}

const PRODUCT_DESCRIPTION: { label: DescriptionLabel; component: FC }[] = [
  { label: DescriptionLabel.MainProductInfo, component: MainProductInfo },
  { label: DescriptionLabel.ProductCategory, component: ProductCategory },
  { label: DescriptionLabel.Properties, component: Properties },
  { label: DescriptionLabel.Variations, component: Variation },
  { label: DescriptionLabel.Bundles, component: Bundles },
  { label: DescriptionLabel.Pricing, component: Pricing },
];

export const ProductDescription: FC = (): JSX.Element => {
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
    <div className={style.description_wrapper}>
      <Title as="h1" className={style.title}>
        Product Description
      </Title>
      <Paragraph size="s" className={style.paragraph}>
        Enter the information about your first product
      </Paragraph>
      <ul className={style.description_list}>
        {PRODUCT_DESCRIPTION.map((item, index) => (
          <li key={index}>
            <div
              className={style.description_item}
              onClick={() => handleClick(index)}
              onKeyDown={event => handleKeyDown(index, event)}
              role="button"
              tabIndex={0}
            >
              {item.label}
              <ArrowIcon
                className={cn(style.arrow, {
                  [style.arrow_up]: activeItem === index,
                })}
              />
            </div>
            {activeItem === index && <item.component />}
          </li>
        ))}
      </ul>
    </div>
  );
};
