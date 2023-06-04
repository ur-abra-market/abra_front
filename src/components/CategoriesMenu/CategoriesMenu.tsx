import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import {
  categoryService,
  ResponseCategoryType,
} from '../../store/reducers/categorySlice';

import style from './CategoriesMenu.module.css';
import { CategoriesMenuProps } from './CategoriesMenu.props';
import { Items } from './CategoryItems';
import { FilterButton } from './FilterButton/FilterButton';

export interface ItemsProps {
  gender: string;
  items?: ResponseCategoryType[];
}

export type Categories = 'all' | 'clothes' | 'accessories' | 'cosmetics';

type FilteredCategoriesType = {
  [key in Categories]: {
    title: string;
    categories: string[];
  };
};

const filteredCategories: FilteredCategoriesType = {
  all: {
    title: 'All categories',
    categories: [
      'Clothing',
      'Sportswear',
      'Swimwear',
      'Underwear',
      'Home clothes',
      'Outerwear',
      'Bags',
      'Accessories',
      'Shoes',
      'Jewellery',
      'For girls',
      'For boys',
    ],
  },
  accessories: {
    title: 'Clothes',
    categories: ['Bags', 'Accessories', 'Jewellery'],
  },
  clothes: {
    title: 'Accessories',
    categories: [
      'Clothing',
      'Sportswear',
      'Swimwear',
      'Underwear',
      'Home clothes',
      'Outerwear',
      'Shoes',
      'For girls',
      'For boys',
    ],
  },
  cosmetics: {
    title: 'Cosmetics and Self Care',
    categories: [],
  },
};

export const CategoriesMenu = forwardRef(
  (props: CategoriesMenuProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [activeCategories, setActiveCategories] = useState<Categories>('all');

    const categories = useAppSelector(state => state.category.dateCategories);

    const wearerCategory = categories ? categories.filter(c => c.level === 1) : [];

    const dispatch = useAppDispatch();

    const filterCategories = (
      category?: ResponseCategoryType[],
    ): ResponseCategoryType[] | [] => {
      return category
        ? category.filter(c =>
            filteredCategories[activeCategories].categories.includes(c.name),
          )
        : [];
    };

    useEffect(() => {
      // prevent unnecessary requests for following rerenderings
      if (!categories) dispatch(categoryService());
    }, [dispatch, categories]);

    return (
      <div ref={ref} className={cn(style.menu_container)}>
        <ul>
          {(Object.keys(filteredCategories) as Categories[]).map((c, index) => (
            <FilterButton
              key={index}
              value={c}
              activeValue={activeCategories}
              callback={setActiveCategories}
            >
              {filteredCategories[c].title}
            </FilterButton>
          ))}
        </ul>
        {wearerCategory.map(c => (
          <Items key={c.id} gender={c.name} items={filterCategories(c.children)} />
        ))}
      </div>
    );
  },
);
