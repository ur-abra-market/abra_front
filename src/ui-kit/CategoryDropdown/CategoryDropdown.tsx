import React, { FC, JSX, useEffect, useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons';
import { useAppSelector, useOnClickOutside } from 'common/hooks';
import { useGetSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useGetSearchParams';
import { CategoryList } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/ProductCategory/CategoryList/CategoryList';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { Button, Checkbox } from 'ui-kit';

import style from './CategoryDropdown.module.scss';

interface ICategoryDropDown {
  handleCategoryURLUpdate: (array: ILastSelectedCategory[]) => void;
}

export interface ILastSelectedCategory {
  id: number | null;
  name: string;
  parentId?: number | null;
}

export const CategoryDropdown: FC<ICategoryDropDown> = ({
  handleCategoryURLUpdate,
}): JSX.Element => {
  const categories = useAppSelector(state => state.common.categories);
  const [isOpen, setIsOpen] = useState(false);
  const refDropdown = useOnClickOutside(setIsOpen);
  const [selectedCategories, setIsSelectedCategories] = useState<ILastSelectedCategory[]>(
    [],
  );
  const selectedCategoryId = categories.map(category => category.id);

  const selectedNameCategories = selectedCategories.map(el => el.name);
  const { categoryIds } = useGetSearchParams();
  const emptyCategory = selectedCategories.length === 0 && categoryIds.length === 0;

  function extractAllObjects(categories: ICategoryResponse[]): ICategoryResponse[] {
    return categories.reduce<ICategoryResponse[]>((acc, obj) => {
      return acc.concat(obj, obj.children ? extractAllObjects(obj.children) : []);
    }, []);
  }

  console.log(extractAllObjects(categories));
  const handleChangeCategory = (category: ILastSelectedCategory): void => {
    const existingCategory = selectedCategories.find(c => c.id === category.id);

    if (category.id === null && category.name === '') {
      setIsSelectedCategories(
        selectedCategories.filter(c => c.parentId !== category.parentId),
      );
    } else if (existingCategory && selectedCategories.includes(existingCategory)) {
      setIsSelectedCategories(selectedCategories.filter(c => c.id !== category.id));
    } else {
      setIsSelectedCategories([...selectedCategories, category]);
    }
  };

  useEffect(() => {
    if (!isOpen) handleCategoryURLUpdate(selectedCategories);
  }, [selectedCategories, isOpen]);

  return (
    <div ref={refDropdown} className={style.dropdown}>
      <Button
        color="white"
        className={style.dropdown_btn}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className={style.filter_name}>{`${
          emptyCategory ? 'All' : selectedNameCategories
        }${
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
  handleSelectedCategory?: (category: ILastSelectedCategory) => void;
}
const List: FC<IList> = ({ category, handleSelectedCategory }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const isLastCategory = !category.children || category.children.length === 0;
  const isParentCategory = category.children && category.parent_id;
  const { categoryIds } = useGetSearchParams();
  const [isChecked, setIsChecked] = useState(categoryIds.includes(category.id));

  const handleCategory = (): void => {
    if (handleSelectedCategory) {
      if (isParentCategory && isOpen) {
        handleSelectedCategory({
          id: null,
          name: '',
          parentId: category.id,
        });
      }
      if (isLastCategory) {
        handleSelectedCategory({
          id: category.id,
          name: category.name,
          parentId: category.parent_id!,
        });
        setIsChecked(!isChecked);
      }
    }
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div
        style={{ paddingLeft: category.parent_id ? '22px' : '0' }}
        className={style.sss}
      >
        {!isLastCategory ? (
          <ArrowIcon className={cn({ [style.arrow_up]: isOpen })} width="14" />
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
        isOpen &&
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
