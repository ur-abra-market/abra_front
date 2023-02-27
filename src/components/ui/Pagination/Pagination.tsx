import React, { FC } from 'react';

import { useDispatch } from 'react-redux';

import { active } from '../../../store/reducers/paginateSlice';

import styles from './Pagination.module.css';

interface PaginationProps {
  activePage: number;
  amountPages: number;
}
const Pagination: FC<PaginationProps> = ({ activePage, amountPages }) => {
  const dispatch = useDispatch();

  const arrPages = Array(amountPages - 2).fill(2);
  const pages = amountPages > 2 ? arrPages.map((_, i) => i + 2) : [];

  const buttons = pages.map(p => {
    let currentClass = '';

    if (activePage === p) currentClass = `${styles.activePage}`;
    if (Math.abs(activePage - p) > 2) currentClass = `${styles.invisible}`;

    return (
      <div
        className={`${styles.cursor} ${currentClass}`}
        key={p}
        onClick={() => handlePage(p)}
      >
        {p}
      </div>
    );
  });

  const handlePage = (page: any) => {
    dispatch(active(page));
  };

  return (
    <div className={styles.Paginator}>
      <div
        className={styles.Paginator__left}
        onClick={() => (activePage > 1 ? handlePage(activePage - 1) : false)}
      >
        <div className={styles.Paginator__left_arrow} />
      </div>
      <div className={styles.Paginator__numbers}>
        <div
          className={activePage === 1 ? `${styles.activePage}` : `${styles.cursor}`}
          onClick={() => handlePage(1)}
        >
          1
        </div>

        <div className={amountPages < 5 || activePage < 5 ? `${styles.invisible}` : ''}>
          ...
        </div>
        {buttons}
        <div
          className={
            amountPages < 5 || amountPages - activePage < 4 ? `${styles.invisible}` : ''
          }
        >
          ...
        </div>

        <div
          className={
            activePage === amountPages ? `${styles.activePage}` : `${styles.cursor}`
          }
          onClick={() => handlePage(amountPages)}
        >
          {amountPages}
        </div>
      </div>
      <div
        className={styles.Paginator__right}
        onClick={() => (activePage < amountPages ? handlePage(activePage + 1) : false)}
      >
        <div className={styles.Paginator__right_arrow} />
      </div>
    </div>
  );
};

export default Pagination;
