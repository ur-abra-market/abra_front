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

export type Categories = 'Women clothes' | 'Mens clothes' | 'Kids clothes';

export interface ItemsProps {
  items?: ResponseCategoryType[];
}

export const CategoriesMenu = forwardRef(
  (props: CategoriesMenuProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [activeCategories, setActiveCategories] = useState<Categories>('Women clothes');

    const categories = useAppSelector(state => state.category.dateCategories);

    const wearerCategory = categories ? categories.filter(c => c.level === 1) : [];

    const dispatch = useAppDispatch();

    const filterCategories = (
      category?: ResponseCategoryType[],
    ): ResponseCategoryType[] | [] => {
      return category
        ? category.filter(c => {
            return c.name;
          })
        : [];
    };

    useEffect(() => {
      // prevent unnecessary requests for following rerenderings
      if (!categories) dispatch(categoryService());
    }, [dispatch, categories]);

    return (
      <div ref={ref} className={cn(style.menu_container)}>
        <ul>
          {wearerCategory.map(c => {
            return (
              <FilterButton
                key={c.id}
                value={c.name}
                activeValue={activeCategories}
                callback={setActiveCategories}
              >
                {c.name}
              </FilterButton>
            );
          })}
        </ul>
        {wearerCategory
          .filter(c => c.name === activeCategories)
          .map(c => {
            return <Items key={c.id} items={filterCategories(c.children)} />;
          })}
      </div>
    );
  },
);
