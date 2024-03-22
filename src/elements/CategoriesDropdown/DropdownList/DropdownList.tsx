import React, { FC, JSX, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { ILastSelectedCategory } from 'elements/CategoriesDropdown/CategoriesDropdown';
import { useGetSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useGetSearchParams';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { Checkbox } from 'ui-kit';

import style from 'elements/CategoriesDropdown/DropdownList/DropdownList.module.scss';

interface IDropdownList {
  categories: ICategoryResponse;
  handleSelectedCategory: (category: ILastSelectedCategory) => void;
}
export const DropdownList: FC<IDropdownList> = ({
  categories,
  handleSelectedCategory,
}): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const isLastCategory = !categories.children || categories.children.length === 0;
  const isParentCategory = categories.children && categories.parent_id;
  const { categoryIds } = useGetSearchParams();
  const [isChecked, setIsChecked] = useState(categoryIds.includes(categories.id));

  const handleCategoryChange = (): void => {
    if (isParentCategory) {
      handleSelectedCategory({
        id: null,
        name: '',
        parentId: categories.id,
      });
    } else if (isLastCategory) {
      handleSelectedCategory({
        id: categories.id,
        name: categories.name,
        parentId: categories.parent_id!,
      });
      setIsChecked(!isChecked);
    }
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      handleCategoryChange();
    }
  };

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onClick={handleCategoryChange}
        className={cn(style.dropdown_list, {
          [style.child_dropdown_list]: categories.parent_id,
        })}
      >
        {!isLastCategory ? (
          <ArrowIcon className={cn({ [style.arrow_up]: isOpen })} width="14" />
        ) : (
          <Checkbox
            className={style.checkbox}
            variant="default"
            checked={isChecked}
            onChange={handleCategoryChange}
          />
        )}
        <div className={style.title}>{categories.name}</div>
      </div>

      {!isLastCategory &&
        isOpen &&
        categories.children?.map(category => (
          <DropdownList
            handleSelectedCategory={handleSelectedCategory}
            key={category.id}
            categories={category}
          />
        ))}
    </>
  );
};
