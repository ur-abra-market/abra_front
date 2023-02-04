import React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { active } from '../../store/reducers/paginateSlice';

import style from './Paginator.module.css';

const Paginator = () => {
  const dispatch = useDispatch();

  const activePage = useSelector(state => state.paginate.page_num);
  const amountPages = useSelector(state => state.paginate.amountPages);

  const arrPages = Array(amountPages - 2).fill(2);
  const pages = amountPages > 2 ? arrPages.map((_, i) => i + 2) : [];

  const buttons = pages.map(p => {
    let currentClass = '';

    if (activePage === p) currentClass = style.activePage;
    if (Math.abs(activePage - p) > 2) currentClass = style.invisible;

    return (
      <div
        className={`${style.cursor}${currentClass}`}
        key={p}
        onClick={() => handlePage(p)}
      >
        {p}
      </div>
    );
  });

  const handlePage = page => {
    dispatch(active(page));
  };

  return (
    <div className={style.paginator}>
      <div
        className={style.paginator__left}
        onClick={() => (activePage > 1 ? handlePage(activePage - 1) : false)}
      >
        <div className={style.paginator__left_arrow} />
      </div>
      <div className={style.paginator__numbers}>
        <div
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
          className={`${style.cursor} ${
            activePage === amountPages ? style.activePage : ''
          }`}
          onClick={() => handlePage(amountPages)}
        >
          {amountPages}
        </div>
      </div>
      <div
        className={style.paginator__right}
        onClick={() => (activePage < amountPages ? handlePage(activePage + 1) : false)}
      >
        <div className={style.paginator__right_arrow} />
      </div>
    </div>
  );
};

export default Paginator;
