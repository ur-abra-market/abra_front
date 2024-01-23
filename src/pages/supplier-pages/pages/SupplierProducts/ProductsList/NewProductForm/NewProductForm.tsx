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

const enum SectionLabel {
  INFO = 'Main Product Info',
  CATEGORY = 'Product Category',
  PROPERTIES = 'Properties',
  VARIATIONS = 'Variations',
  BUNDLES = 'Bundles',
  PRICING = 'Pricing',
}

const ADD_PRODUCT_FORM_SECTIONS: { label: SectionLabel; component: FC }[] = [
  { label: SectionLabel.INFO, component: MainProductInfo },
  { label: SectionLabel.CATEGORY, component: ProductCategory },
  { label: SectionLabel.PROPERTIES, component: Properties },
  { label: SectionLabel.VARIATIONS, component: Variation },
  { label: SectionLabel.BUNDLES, component: Bundles },
  { label: SectionLabel.PRICING, component: Pricing },
];

export const NewProductForm: FC = (): JSX.Element => {
  const [openedFormSections, setOpenedFormSections] = useState<SectionLabel[]>([]);

  const handleSectionToggle = (label: SectionLabel): void => {
    setOpenedFormSections(prevOpenSections =>
      prevOpenSections.includes(label)
        ? prevOpenSections.filter(item => item !== label)
        : [...prevOpenSections, label],
    );
  };

  const handleKeyDown = (label: SectionLabel, event: React.KeyboardEvent): void => {
    if (event.key === 'Enter') {
      handleSectionToggle(label);
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
        {ADD_PRODUCT_FORM_SECTIONS.map((item, index) => (
          <li key={index}>
            <div
              className={style.description_item}
              onClick={() => handleSectionToggle(item.label)}
              onKeyDown={event => handleKeyDown(item.label, event)}
              role="button"
              tabIndex={0}
            >
              {item.label}
              <ArrowIcon
                className={cn(style.arrow, {
                  [style.arrow_up]: openedFormSections.includes(item.label),
                })}
              />
            </div>
            {openedFormSections.includes(item.label) && <item.component />}
          </li>
        ))}
      </ul>
    </div>
  );
};
