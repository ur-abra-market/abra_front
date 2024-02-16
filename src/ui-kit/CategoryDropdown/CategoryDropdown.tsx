import React, { FC, JSX, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { useAppSelector, useOnClickOutside } from 'common/hooks';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { Button, Checkbox } from 'ui-kit';

import style from './CategoryDropdown.module.scss';

interface ICategoryDropDown {
  onChangeCategoryB: (value: (number | null)[]) => void;
}

export const CategoryDropdown: FC<ICategoryDropDown> = ({
  onChangeCategoryB,
}): JSX.Element => {
  const categories = useAppSelector(state => state.common.categories);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setIsSelectedCategories] = useState<
    { id: number | null; name: string; parentId?: number | null }[]
  >([]);
  const emptyCategory = selectedCategories.length === 0;
  const categoriesName = selectedCategories.map(el => el.name);
  const refDropdown = useOnClickOutside(setIsOpen);

  const handleChangeCategory = (
    id: number | null,
    name: string,
    parentId: number | null,
  ): void => {
    const existingCategory = selectedCategories.find(category => category.id === id);

    if (id === null && name === '') {
      setIsSelectedCategories(
        selectedCategories.filter(category => category.parentId !== parentId),
      );
    } else if (existingCategory && selectedCategories.includes(existingCategory)) {
      setIsSelectedCategories(selectedCategories.filter(category => category.id !== id));
    } else {
      setIsSelectedCategories([...selectedCategories, { id, name, parentId }]);
    }
    onChangeCategoryB(selectedCategories.map(el => el.id));
  };

  return (
    <div ref={refDropdown} className={style.dropdown}>
      <Button
        color="white"
        className={style.dropdown_btn}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className={style.filter_name}>{`${emptyCategory ? 'All' : categoriesName}${
          selectedCategories.length - 1 === selectedCategories.length ? ', ' : ''
        } `}</span>
        <ArrowIcon
          style={{ minWidth: '14px' }}
          className={cn({ [style.arrow_up]: isOpen })}
          width="14"
        />
      </Button>
      <div
        className={style.dropdown_content}
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        {categories.map(category => (
          <List
            handleSelectedCategory={handleChangeCategory}
            key={category.id}
            category={category}
          />
        ))}
      </div>
    </div>
  );
};
interface IList {
  category: ICategoryResponse;
  handleSelectedCategory: (
    id: number | null,
    name: string,
    parentId: number | null,
  ) => void;
}
const List: FC<IList> = ({ category, handleSelectedCategory }): JSX.Element => {
  const [isChecked, setIsChecked] = useState(false);
  const isLastCategory = !category.children || category.children.length === 0;
  const isParentCategory = category.children && category.parent_id;
  const handleCategory = (): void => {
    if (isParentCategory && isChecked) {
      handleSelectedCategory(null, '', category.id);
    }
    if (isLastCategory) {
      handleSelectedCategory(category.id, category.name, category.parent_id!);
    }
    setIsChecked(prevState => !prevState);
  };

  return (
    <>
      <div
        style={{ paddingLeft: category.parent_id ? '22px' : '0' }}
        className={style.sss}
      >
        {!isLastCategory ? (
          <ArrowIcon className={cn({ [style.arrow_up]: isChecked })} width="14" />
        ) : (
          <Checkbox
            className={cn(style.checkbox, {
              [style.last_checkbox]: isLastCategory,
            })}
            variant="default"
            checked={isChecked}
            onChange={handleCategory}
          />
        )}
        <div
          className={style.titles}
          role="button"
          tabIndex={0}
          onKeyDown={() => {}}
          onClick={handleCategory}
        >
          {category.name}
        </div>
      </div>

      {!isLastCategory &&
        isChecked &&
        category.children?.map(el => (
          <List
            handleSelectedCategory={handleSelectedCategory}
            key={el.id}
            category={el}
          />
        ))}
    </>
  );
};
