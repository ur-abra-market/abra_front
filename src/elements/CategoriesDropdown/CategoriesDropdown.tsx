import React, { FC, JSX, useEffect, useState } from 'react';

import cn from 'classnames';

import { DropdownList } from './DropdownList/DropdownList';

import { ArrowIcon } from 'assets/icons';
import { useAppSelector, useOnClickOutside } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { useGetSearchParams } from 'pages/supplier-pages/pages/SupplierProducts/common/hoocks/useGetSearchParams';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import {
  categoriesLoadingSelector,
  categoriesSelector,
} from 'store/reducers/commonSlice';
import { Button } from 'ui-kit';

import style from './CategoriesDropdown.module.scss';

interface ICategoryDropdown {
  handleCategoryURLUpdate: (array: ILastSelectedCategory[]) => void;
}

export interface ILastSelectedCategory {
  id: number | null;
  name: string;
  parentId?: number | null;
}

export const CategoriesDropdown: FC<ICategoryDropdown> = ({
  handleCategoryURLUpdate,
}): JSX.Element => {
  const categories = useAppSelector(categoriesSelector);
  const loading = useAppSelector(categoriesLoadingSelector);
  const { categoryIds } = useGetSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategories, setIsSelectedCategories] = useState<ILastSelectedCategory[]>(
    [],
  );
  const ref = useOnClickOutside(setIsOpen);
  const allCategories = extractCategories(categories);
  const selectedNameCategories = selectedCategories.map(el => el.name);
  const emptyCategory = selectedCategories.length === 0;
  const isLastCategory = selectedCategories[selectedCategories.length - 1];

  const openDropdown = (): void => {
    setIsOpen(true);
  };
  const closeDropdown = (): void => {
    handleCategoryURLUpdate(selectedCategories);
    setIsOpen(false);
  };
  const toggleDropdown = (): void => {
    if (isOpen) {
      closeDropdown();

      return;
    }
    openDropdown();
  };

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
    if (categoryIds.length > 0 && selectedCategories.length === 0) {
      const dataFromUrl: ILastSelectedCategory[] = allCategories
        .filter(category => categoryIds.includes(category.id))
        .map(el => ({
          id: el.id,
          name: el.name,
          parentId: el.parent_id,
        }));

      setIsSelectedCategories(dataFromUrl);
    }
  }, [categories]);

  return (
    <div ref={ref} className={style.dropdown}>
      <Button
        disabled={loading === LoadingStatusEnum.Loading}
        color="white"
        className={style.dropdown_btn}
        onClick={toggleDropdown}
      >
        <span className={style.filter_name}>{`${
          emptyCategory ? 'All' : selectedNameCategories
        }${!isLastCategory && !emptyCategory ? ', ' : ''} `}</span>
        <ArrowIcon
          style={{ minWidth: '14px' }}
          className={cn({ [style.arrow_up]: isOpen })}
          width="14"
        />
      </Button>
      <div
        className={cn(style.dropdown_content, {
          [style.hidden_dropdown_content]: !isOpen,
        })}
      >
        {categories.map(category => (
          <DropdownList
            handleSelectedCategory={handleChangeCategory}
            key={category.id}
            categories={category}
          />
        ))}
      </div>
    </div>
  );
};

const extractCategories = (categories: ICategoryResponse[]): ICategoryResponse[] => {
  const flattenedCategories: ICategoryResponse[] = [];

  const extractCategory = (category: ICategoryResponse): void => {
    flattenedCategories.push(category);

    if (category.children) {
      category.children.forEach((child: ICategoryResponse) => {
        extractCategory(child);
      });
    }
  };

  categories.forEach((category: ICategoryResponse) => {
    extractCategory(category);
  });

  return flattenedCategories;
};
