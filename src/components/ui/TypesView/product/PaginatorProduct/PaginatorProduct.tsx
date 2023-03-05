import React from 'react';

import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../../../../../store/hooks';
import { activeNum } from '../../../../../store/reducers/productPaginateSlice';

import style from './PaginatorProduct.module.css';

const PaginatorProduct = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const activePage = useAppSelector(state => state.productPaginate.pageNum);
  const amountPages = useAppSelector(state => state.productPaginate.amountPages);

  const arrPages = amountPages > 2 ? Array(amountPages - 2).fill(2) : Array(1).fill(1);
  const pages = amountPages > 2 ? arrPages.map((_, i) => i + 2) : [];

  const buttons = pages.map(p => {
    let currentClass = '';

    if (activePage === p) currentClass = style.active_page;
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

  const handlePage = (page: number): void => {
    dispatch(activeNum(page));
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
          className={cn(style.cursor, { [style.active_page]: activePage === 1 })}
          onClick={() => handlePage(1)}
        >
          1
        </div>
        <div className={cn({ [style.invisible]: amountPages < 5 || activePage < 5 })}>
          ...
        </div>
        {buttons}
        <div
          className={cn({
            [style.invisible]: amountPages < 5 || amountPages - activePage < 4,
          })}
        >
          ...
        </div>

        {amountPages > 1 && (
          <div
            role="presentation"
            className={cn(style.cursor, {
              [style.active_page]: activePage === amountPages,
            })}
            onClick={() => handlePage(amountPages)}
          >
            {amountPages}
          </div>
        )}
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

export default PaginatorProduct;
