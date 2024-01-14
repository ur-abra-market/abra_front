import React, { FC, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { Bundles } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/Bundles/Bundles';
import { MainProductInfo } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/MainProductInfo/MainProductInfo';
import { Pricing } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/Pricing/Pricing';
import { ProductCategory } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/ProductCategory/ProductCategory';
import { Properties } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/Properties/Properties';
import { Variation } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/NewProductForm/Variation/Variation';
import { Paragraph, Title } from 'ui-kit';

import style from './NewProductForm.module.scss';

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

export const NewProductForm: FC = (): JSX.Element => {
  const [activeLabel, setActiveLabel] = useState<DescriptionLabel[]>([]);

  const handleItemClick = (label: DescriptionLabel): void => {
    setActiveLabel(prevActiveLabels =>
      prevActiveLabels.includes(label)
        ? prevActiveLabels.filter(item => item !== label)
        : [...prevActiveLabels, label],
    );
  };

  const handleKeyDown = (label: DescriptionLabel, event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleItemClick(label);
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
              onClick={() => handleItemClick(item.label)}
              onKeyDown={event => handleKeyDown(item.label, event)}
              role="button"
              tabIndex={0}
            >
              {item.label}
              <ArrowIcon
                className={cn(style.arrow, {
                  [style.arrow_up]: activeLabel.includes(item.label),
                })}
              />
            </div>
            {activeLabel.includes(item.label) && <item.component />}
          </li>
        ))}
      </ul>
    </div>
  );
};
