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

interface CategoryDropdownProps {
  category: Category;
  depth: number;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({ category, depth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const categoryDepthValue = 10;
  const subcategoryDepthValue = 15;

  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleDropdown();
    }
  };

  return (
    <div style={{ paddingLeft: `${categoryDepthValue * depth}px` }}>
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
      {isOpen && category.subcategories && (
        <ul>
          {category.subcategories.map(subcategory => (
            <li
              key={subcategory.id}
              className={style.subcategory}
              style={{ paddingLeft: `${subcategoryDepthValue * depth}px` }}
            >
              {subcategory.subcategories ? (
                <CategoryDropdown category={subcategory} depth={depth + 1} />
              ) : (
                <span className={style.checkbox_container}>
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
      )}
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
        <CategoryDropdown key={category.id} category={category} depth={0} />
      ))}
    </div>
  );
};
