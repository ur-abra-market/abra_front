import { FC } from 'react';

import { useDispatch } from 'react-redux';

import style from './PaginationSettings.module.scss';

import { useAppSelector } from 'common/hooks';
import ShowPage from 'old-components/ShowPage';
import { active } from 'store/reducers/paginateSlice';
import { Pagination } from 'ui-kit/Pagination/Pagination';

export const PaginationSettings: FC = (): JSX.Element => {
  const activePage = useAppSelector(state => state.paginate.page_num);
  const amountPages = useAppSelector(state => state.paginate.amountPages);
  const dispatch = useDispatch();

  const handleSetActivePage = (pageNumber: number): void => {
    dispatch(active(pageNumber));
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
