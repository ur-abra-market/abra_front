import React from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { active } from '../../store/reducers/paginateSlice';

import style from './Paginator.module.css';

const Paginator = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const activePage = useAppSelector(state => state.paginate.page_num);
  const amountPages = useAppSelector(state => state.paginate.amountPages);

  const arrPages = Array(amountPages - 2).fill(2);
  const pages = amountPages > 2 ? arrPages.map((_, i) => i + 2) : [];

  const buttons = pages.map(p => {
    let currentClass = '';

    if (activePage === p) currentClass = style.activePage;
    if (Math.abs(activePage - p) > 2) currentClass = style.invisible;

    return (
      <div
        role="presentation"
        className={`${style.cursor}${currentClass}`}
        key={p}
        onClick={() => handlePage(p)}
      >
        {p}
      </div>
    );
  });

  const handlePage = (page: any): void => {
    dispatch(active(page));
  };

  return (
    <div className={style.wrapper}>
      <div
        role="presentation"
        className={style.left}
        onClick={() => (activePage > 1 ? handlePage(activePage - 1) : false)}
      >
        <div className={style.left_arrow} />
      </div>
      <div className={style.numbers}>
        <div
          role="presentation"
          className={`${style.cursor}${activePage === 1 ? 'activePage' : ''}`}
          onClick={() => handlePage(1)}
        >
          1
        </div>

        <div className={amountPages < 5 || activePage < 5 ? style.invisible : ''}>
          ...
        </div>
        {buttons}
        <div
          className={
            amountPages < 5 || amountPages - activePage < 4 ? style.invisible : ''
          }
        >
          ...
        </div>

        <div
          role="presentation"
          className={`${style.cursor} ${
            activePage === amountPages ? style.active_page : ''
          }`}
          onClick={() => handlePage(amountPages)}
        >
          {amountPages}
        </div>
      </div>
      <div
        role="presentation"
        className={style.right}
        onClick={() => (activePage < amountPages ? handlePage(activePage + 1) : false)}
      >
        <div className={style.right_arrow} />
      </div>
    </div>
  );
};

export default Paginator;
