import { useEffect, useState } from 'react';

import { useSearchParams } from 'react-router-dom';

import { ProductFilter } from './ProductFilter/ProductFilter';
import { ProductList } from './ProductList/ProductList';

import { WithLayout } from 'common/hocs/WithLayout';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import Modal from 'elements/Modal';
import { setResetAllFilters, setSortBy, setSortField } from 'store/reducers/productSlice';
import { sortBySelector, sortFieldSelector } from 'store/reducers/productSlice/selectors';
import { ISortBy, ISortField } from 'store/reducers/productSlice/types';

import style from './ProductListPage.module.scss';

export const ProductListPage = WithLayout((): JSX.Element => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = useAppSelector(sortFieldSelector);
  const sortBy = useAppSelector(sortBySelector);
  const currentSortField = searchParams.get('sortField') || 'rating';
  const currentSortBy = searchParams.get('sortBy') || 'desc';
  const [isModalOpen, setModalOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = (): void => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    dispatch(setSortField(currentSortField as ISortField));
    dispatch(setSortBy(currentSortBy as ISortBy));
  }, []);

  const handleResetAllFilters = (): void => {
    const params = `sortField=rating&sortBy=desc`;

    dispatch(setResetAllFilters());
    setSearchParams(params);
  };

  const handleSaveQueryParams = (): void => {
    const params = `sortField=${sortField}&sortBy=${sortBy}`;

    setSearchParams(params);
  };

  return (
    <div className={style.product_list_page}>
      {windowWidth >= 769 ? (
        <ProductFilter
          onSaveQueryParams={handleSaveQueryParams}
          onResetAllFilters={handleResetAllFilters}
        />
      ) : (
        <Modal showModal={isModalOpen} closeModal={setModalOpen}>
          <ProductFilter
            onSaveQueryParams={handleSaveQueryParams}
            onResetAllFilters={handleResetAllFilters}
          />
        </Modal>
      )}

      <ProductList
        windowWidth={windowWidth}
        closeModal={setModalOpen}
        currentSortField={currentSortField as ISortField}
        currentSortBy={currentSortBy as ISortBy}
      />
    </div>
  );
});
