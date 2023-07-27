import { FC } from 'react';

import { useDispatch } from 'react-redux';

import style from './PaginationSettings.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import ShowPage from 'old-components/ShowPage';
import { active } from 'store/reducers/paginateSlice';
import { manageProducts } from 'store/reducers/productSlice/thunks';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const PaginationSettings = (): JSX.Element => {
  const activePage = useAppSelector(state => state.paginate.page_num);
  const amountPages = useAppSelector(state => state.paginate.amountPages);
  const dispatch = useAppDispatch();

  const handleSetActivePage = (pageNumber: number): void => {
    dispatch(active(pageNumber));
    dispatch(manageProducts());
  };

  return (
    <div className={style.select_and_pagination_wrapper}>
      <ShowPage />
      <Pagination
        currentPage={activePage}
        totalPages={amountPages}
        onPageChanged={handleSetActivePage}
      />
    </div>
  );
};
