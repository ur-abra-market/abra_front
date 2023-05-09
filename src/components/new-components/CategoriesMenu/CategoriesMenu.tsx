import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import cn from 'classnames';

import {
  categoryService,
  ResponseCategoryType,
} from '../../../store/reducers/categorySlice';

import style from './CategoriesMenu.module.css';
import { CategoriesMenuProps } from './CategoriesMenu.props';
import { Items } from './CategoryItems';

import { useAppDispatch, useAppSelector } from 'store/hooks';

const filteredCategories: FilteredCategoriesType = {
  all: [
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
  accessories: ['Bags', 'Accessories', 'Jewellery'],
  clothes: [
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
  cosmetics: [],
};

export const CategoriesMenu = forwardRef(
  (props: CategoriesMenuProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [activeCategories, setActiveCategories] = useState<Categroies>('all');

    const categories = useAppSelector(state => state.category.dateCategories);

    const wearerCategory = categories ? categories.filter(c => c.level === 1) : [];

    const dispatch = useAppDispatch();

    const filterCategories = (
      category?: ResponseCategoryType[],
    ): ResponseCategoryType[] | [] => {
      return category
        ? category.filter(c => filteredCategories[activeCategories].includes(c.name))
        : [];
    };

    useEffect(() => {
      // prevent unnecessary requests for following rerenderings
      if (!categories) dispatch(categoryService());
    }, [dispatch, categories]);

    return (
      <div ref={ref} className={cn(style.menu_container)}>
        <ul role="menu">
          <li>
            <button
              type="button"
              onClick={() => setActiveCategories('all')}
              className={cn({
                [style.active_button]: activeCategories === 'all',
              })}
            >
              All categories
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActiveCategories('clothes')}
              className={cn({
                [style.active_button]: activeCategories === 'clothes',
              })}
            >
              Clothes
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActiveCategories('accessories')}
              className={cn({
                [style.active_button]: activeCategories === 'accessories',
              })}
            >
              Accessories
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActiveCategories('cosmetics')}
              className={cn({
                [style.active_button]: activeCategories === 'cosmetics',
              })}
            >
              Cosmetics and Self Care
            </button>
          </li>
        </ul>
        {wearerCategory.map(c => (
          <Items key={c.id} gender={c.name} items={filterCategories(c.children)} />
        ))}
      </div>
    );
  },
);

export interface ItemsProps {
  gender: string;
  items?: ResponseCategoryType[];
}

type Categroies = 'all' | 'clothes' | 'accessories' | 'cosmetics';

type FilteredCategoriesType = {
  [key in Categroies]: string[];
};
