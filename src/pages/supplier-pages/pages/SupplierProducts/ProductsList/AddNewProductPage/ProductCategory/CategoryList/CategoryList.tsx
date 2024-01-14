import React, { FC, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { Checkbox, Title } from 'ui-kit';

import style from './CategoryList.module.scss';

interface ICategoryList {
  category: ICategoryResponse;
  selectedCategory: number | null;
  handleCheckboxChange: (id: number | null) => void;
}

export const CategoryList: FC<ICategoryList> = ({
  category,
  selectedCategory,
  handleCheckboxChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const isChecked = selectedCategory === category.id;
  const toggleDropdown = (): void => {
    setIsOpen(!isOpen);
  };
  const toggleCheckbox = (): void | null => {
    if (isChecked) {
      handleCheckboxChange(null);
    } else {
      handleCheckboxChange(category.id);
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
        {category.children ? (
          <ArrowIcon
            className={cn(style.arrow, {
              [style.arrow_up]: isOpen,
            })}
          />
        ) : (
          <Checkbox
            onChange={toggleCheckbox}
            checked={isChecked}
            className={style.checkbox}
            variant="default"
          />
        )}
        <Title
          as="h3"
          onClick={!category.children ? toggleCheckbox : undefined}
          className={style.title}
        >
          {category.name}
        </Title>
      </div>
      {isOpen &&
        category.children &&
        category.children.map(item => (
          <CategoryList
            key={item.id}
            selectedCategory={selectedCategory}
            handleCheckboxChange={handleCheckboxChange}
            category={item}
          />
        ))}
    </div>
  );
};
