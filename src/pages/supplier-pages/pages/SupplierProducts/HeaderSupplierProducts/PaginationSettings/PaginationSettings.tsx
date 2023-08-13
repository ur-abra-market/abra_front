import style from './PaginationSettings.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import ShowPage from 'old-components/ShowPage';
import { pageNumber } from 'store/reducers/supplierProductSlice';
import { supplierProductActions } from 'store/reducers/supplierProductSlice/supplierProductSlice';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const PaginationSettings = (): JSX.Element => {
  const activePage = useAppSelector(pageNumber);
  const dispatch = useAppDispatch();

  const handleSetActivePage = (pageNumber: number): void => {
    dispatch(supplierProductActions.setPage(pageNumber));
  };

  return (
    <div className={style.select_and_pagination_wrapper}>
      <ShowPage />
      <Pagination
        currentPage={activePage}
        totalPages={10}
        onPageChanged={handleSetActivePage}
      />
    </div>
  );
};
