import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import { CategoryList } from './CategoryList/CategoryList';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { getAllCategories } from 'store/reducers/commonSlice';

import style from './ProductCategory.module.scss';

export const ProductCategory: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.common.categories);
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      setIsOpen(!isOpen);
    }
  };

  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <div className={style.category_wrapper}>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={style.category_list_item}
      >
        <ArrowIcon
          className={cn(style.arrow, {
            [style.arrow_up]: isOpen,
          })}
        />
        <h3 className={style.title}>All categories</h3>
      </div>
      {isOpen &&
        categories.map(category => (
          <CategoryList key={category.id} category={category} />
        ))}
    </div>
  );
};
