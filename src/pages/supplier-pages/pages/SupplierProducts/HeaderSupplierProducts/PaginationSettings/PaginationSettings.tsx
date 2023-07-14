import React, { FC } from 'react';

import style from './PaginationSettings.module.scss';

import { useAppSelector } from 'common/hooks';
import ShowPage from 'old-components/ShowPage';
import Pagination from 'old-components/ui/Pagination';

const PaginationSettings: FC = (): JSX.Element => {
  const activePage = useAppSelector(state => state.paginate.page_num);
  const amountPages = useAppSelector(state => state.paginate.amountPages);

  return (
    <div className={style.select_and_pagination_wrapper}>
      <ShowPage />
      <Pagination activePage={activePage} amountPages={amountPages} />
    </div>
  );
};

export default PaginationSettings;
