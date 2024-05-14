import React, { useEffect, useState } from 'react';

import cn from 'classnames';

import { CategoryList } from './CategoryList/CategoryList';

import { ArrowIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useDatabase } from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/hooks/useDatabase';
import {
  FIELDS_NEW_PRODUCT_INFO,
  updateFieldInDataBase,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/AddNewProductPage/utils/indexedDB';
import { ICategoryResponse } from 'services/common/common.serviceTypes';
import { getAllCategories } from 'store/reducers/commonSlice';
import { BreadCrumbs } from 'ui-kit';

import style from './ProductCategory.module.scss';

export const ProductCategory: React.FC = () => {
  const {
    db,
    selectedCategoryIdOfDatabase,
    setSelectedCategoryIdOfDatabase,
    pathCategoriesOfDatabase,
    setPathCategoriesOfDatabase,
  } = useDatabase();
  const dispatch = useAppDispatch();
  const categories = useAppSelector(state => state.common.categories);
  const [isOpen, setIsOpen] = useState(false);

  const handleCategoryChange = async (
    id: number | null,
    path: ICategoryResponse[],
  ): Promise<void> => {
    setSelectedCategoryIdOfDatabase(id);
    setPathCategoriesOfDatabase(path);

    if (db) {
      await updateFieldInDataBase(db, FIELDS_NEW_PRODUCT_INFO.ProductInfo, {
        selectedCategory: id,
        categoryPath: path,
      });
    }
  };

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
  }, [db]);

  return (
    <div className={style.category_wrapper}>
      {pathCategoriesOfDatabase &&
      pathCategoriesOfDatabase.find(
        el => !el.children && el.id === selectedCategoryIdOfDatabase,
      ) ? (
        <BreadCrumbs
          className={style.bread_crumbs}
          breadCrumbs={pathCategoriesOfDatabase}
        />
      ) : null}
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
          <CategoryList
            key={category.id}
            categories={category}
            selectedCategoryId={selectedCategoryIdOfDatabase}
            handleCategoryChange={handleCategoryChange}
          />
        ))}
    </div>
  );
};
