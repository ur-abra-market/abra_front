import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import cn from 'classnames';

import { categoryService } from '../../../store/reducers/categorySlice';

import style from './CategoriesMenu.module.css';
import { CategoriesMenuProps } from './CategoriesMenu.props';
import { Items } from './CategoryItems';

import { useAppDispatch } from 'store/hooks';

export const CategoriesMenu = forwardRef(
  (props: CategoriesMenuProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [activeCategories, setActiveCategories] = useState<Categroies>('all');

    const womenItems = ['Dresses', 'T-shirts', 'Tops', 'Blazers', 'Jeans', 'Skirts'];
    const menItems = ['Hoodies', 'T-shirts', 'Shorts', 'Blazers', 'Jeans', 'Skirts'];

    const isClothes = activeCategories === 'clothes';

    // const categories = useAppSelector(state => state.category.dateCategories);

    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(categoryService());
    }, [dispatch]);

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
        <Items gender="Women" items={isClothes ? womenItems : []} />
        <Items gender="Men" items={isClothes ? menItems : []} />
      </div>
    );
  },
);

export interface ItemsProps {
  gender: string;
  items?: string[];
}

type Categroies = 'all' | 'clothes' | 'accessories' | 'cosmetics';
