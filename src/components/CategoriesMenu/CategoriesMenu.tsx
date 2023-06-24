import React, { ForwardedRef, forwardRef, useEffect, useState } from 'react';

import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../common/hooks';
import { IResponseCategory } from '../../services/common/common.serviceTypes';
import { getAllCategories } from '../../store/reducers/commonSlice';

import style from './CategoriesMenu.module.scss';
import { CategoriesMenuProps } from './CategoriesMenu.props';
import { Items } from './CategoryItems';
import { FilterButton } from './FilterButton/FilterButton';

export type Categories = 'Clothes' | 'Accessories' | 'Cosmetics and Self Care';

export interface ItemsProps {
  items?: IResponseCategory[];
}

export const CategoriesMenu = forwardRef(
  (props: CategoriesMenuProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element => {
    const [activeCategories, setActiveCategories] = useState<Categories>('Clothes');

    const categories = useAppSelector(state => state.common.categories);

    const wearerCategory = categories ? categories.filter(c => c.level === 1) : [];

    const dispatch = useAppDispatch();

    const filterCategories = (
      category?: IResponseCategory[],
    ): IResponseCategory[] | [] => {
      return category
        ? category.filter(c => {
            return c.name;
          })
        : [];
    };

    useEffect(() => {
      // prevent unnecessary requests for following rerenderings
      if (!categories) {
        dispatch(getAllCategories());
      }
    }, [dispatch, categories]);

    return (
      <div ref={ref} className={cn(style.menu_container)}>
        <ul className={style.list}>
          <FilterButton
            key="12"
            value="All categories"
            activeValue={activeCategories}
            callback={setActiveCategories}
          >
            All categories
          </FilterButton>

          {wearerCategory &&
            wearerCategory.map(c => {
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
          ?.filter(c => c.name === activeCategories)
          .map(c => {
            return <Items key={c.id} items={filterCategories(c.children)} />;
          })}
      </div>
    );
  },
);
