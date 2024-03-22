import React, { FC, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { setSelectedCategoryId } from 'store/reducers/commonSlice/slice';
import { Checkbox, Title } from 'ui-kit';

import style from './CategoryList.module.scss';

interface ICategoryList {
  categories: ICategoryResponse;
  selectedCategoryId: number | null;
  handleCategoryChange: (id: number | null, path: ICategoryResponse[]) => void;
  pathCategories?: ICategoryResponse[];
}

export const CategoryList: FC<ICategoryList> = ({
  categories,
  selectedCategoryId,
  handleCategoryChange,
  pathCategories = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isChecked = selectedCategoryId === categories.id;
  const isLastCategory = !categories.children || categories.children.length === 0;
  const dispatch = useAppDispatch();
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };
  const toggleCheckbox = (): void | null => {
    dispatch(setSelectedCategoryId(categories.id));
    if (isChecked) {
      handleCategoryChange(null, []);
    } else {
      handleCategoryChange(categories.id, [...pathCategories, categories]);
    }
  };
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      toggleDropdown();
    }
  };

  return (
    <div className={style.category_list_wrapper}>
      <div
        role="button"
        tabIndex={0}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        className={style.category_list_item}
      >
        {isLastCategory ? (
          <Checkbox
            onChange={toggleCheckbox}
            checked={isChecked}
            className={style.checkbox}
            variant="default"
          />
        ) : (
          <ArrowIcon
            className={cn(style.arrow, {
              [style.arrow_up]: isOpen,
            })}
          />
        )}

        <Title
          as="h3"
          onClick={isLastCategory ? toggleCheckbox : undefined}
          className={style.title}
        >
          {categories.name}
        </Title>
      </div>
      {isOpen &&
        categories.children &&
        categories.children.map(category => (
          <CategoryList
            key={category.id}
            selectedCategoryId={selectedCategoryId}
            handleCategoryChange={handleCategoryChange}
            categories={category}
            pathCategories={[...pathCategories, categories]}
          />
        ))}
    </div>
  );
};
