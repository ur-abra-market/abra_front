import React, { FC, useState } from 'react';

import { ArrowIcon } from 'assets/icons';
import { Checkbox } from 'ui-kit';

import style from './ProductCategory.module.scss';

interface Category {
  id: number;
  name: string;
  isChecked?: boolean;
  subcategories?: Category[];
}

const CategoryDropdown: FC<{ category: Category }> = ({ category }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleDropdown();
    }
  };

  const renderSubcategoryList = (subcategories?: Category[]): JSX.Element | null => {
    return subcategories ? (
      <ul>
        {subcategories.map(subcategory => (
          <li key={subcategory.id} className={style.subcategory}>
            {subcategory.subcategories ? (
              <CategoryDropdown category={subcategory} />
            ) : (
              <span className={style.checkboxContainer}>
                <Checkbox
                  checked={subcategory.isChecked || false}
                  className={style.checkbox}
                />
                {subcategory.name}
              </span>
            )}
          </li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div className={style.category_depth}>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={style.category_container}
      >
        <ArrowIcon className={`${style.product_icon} ${isOpen ? style.icon_open : ''}`} />
        <h3 className={style.category}>{category.name}</h3>
      </div>
      {isOpen && renderSubcategoryList(category.subcategories)}
    </div>
  );
};

export const ProductCategory: React.FC = () => {
  const categories: Category[] = [
    {
      id: 0,
      name: 'All categories',
      subcategories: [
        {
          id: 1,
          name: 'Clothes',
          subcategories: [
            {
              id: 11,
              name: 'Men',
              subcategories: [
                { id: 111, name: 'Hoodies' },
                { id: 112, name: 'Shorts' },
              ],
            },
            {
              id: 12,
              name: 'Women',
              subcategories: [
                { id: 113, name: 'Dresses' },
                { id: 114, name: 'T-shirts' },
              ],
            },
            {
              id: 13,
              name: 'Kids',
              subcategories: [
                { id: 131, name: 'Boys' },
                { id: 132, name: 'Girls' },
              ],
            },
          ],
        },
        {
          id: 2,
          name: 'Accessories',
          subcategories: [
            { id: 21, name: 'Item1' },
            { id: 22, name: 'Item2' },
            { id: 23, name: 'Item3' },
          ],
        },
        {
          id: 3,
          name: 'Cosmetics and self care',
          subcategories: [
            { id: 31, name: 'Item1' },
            { id: 32, name: 'Item2' },
          ],
        },
      ],
    },
  ];

  return (
    <div className={style.container}>
      {categories.map(category => (
        <CategoryDropdown key={category.id} category={category} />
      ))}
    </div>
  );
};
