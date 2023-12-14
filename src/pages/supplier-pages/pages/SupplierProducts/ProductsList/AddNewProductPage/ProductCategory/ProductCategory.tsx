import React, { FC, useState } from 'react';

// import { ArrowIcon } from 'assets/icons';

import style from './ProductCategory.module.scss';

interface Category {
  id: number;
  name: string;
  subcategories?: Category[];
}

interface CategoryDropdownProps {
  category: Category;
  depth: number;
}

const CategoryDropdown: FC<CategoryDropdownProps> = ({ category, depth }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const categoryDepthValue = 20;
  const subcategoryDepthValue = 15;

  const toggleDropdown = (): void => {
    setIsExpanded(!isExpanded);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleDropdown();
    }
  };

  return (
    <div style={{ paddingLeft: `${categoryDepthValue * depth}px` }}>
      <div role="button" tabIndex={0} onClick={toggleDropdown} onKeyDown={handleKeyDown}>
        <h3 className={style.category}>{category.name}</h3>
      </div>
      {isExpanded && category.subcategories && (
        <ul>
          {category.subcategories.map(subcategory => (
            <li key={subcategory.id}>
              {subcategory.subcategories ? (
                <CategoryDropdown category={subcategory} depth={depth + 1} />
              ) : (
                <span
                  className={style.subcategory}
                  style={{ paddingLeft: `${subcategoryDepthValue * depth}px` }}
                >
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
              id: 11,
              name: 'Women',
              subcategories: [
                { id: 113, name: 'Dresses' },
                { id: 114, name: 'T-shirts' },
              ],
            },
            {
              id: 13,
              name: 'Children',
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
          name: 'Cosmetics',
          subcategories: [
            { id: 31, name: 'Item1' },
            { id: 32, name: 'Item2' },
          ],
        },
      ],
    },
  ];

  return (
    <div>
      {categories.map(category => (
        <CategoryDropdown key={category.id} category={category} depth={0} />
      ))}
    </div>
  );
};
