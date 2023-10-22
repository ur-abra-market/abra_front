import React, { FC } from 'react';

import cn from 'classnames';

import { Stars } from 'ui-kit';

import style from './Skeleton.module.scss';

interface ISkeleton {
  selectedView: 'grid' | 'list';
}

export const Skeleton: FC<ISkeleton> = ({ selectedView }): JSX.Element => {
  const skeleton_mods = cn(style.skeleton_wrapper, {
    [style.grid_view_mod]: selectedView === 'grid',
    [style.list_view_mod]: selectedView === 'list',
  });

  const image_container = cn({
    [style.image_grid_container]: selectedView === 'grid',
    [style.image_list_container]: selectedView === 'list',
  });

  const details_block = cn({
    [style.details_grid_block]: selectedView === 'grid',
    [style.details_list_block]: selectedView === 'list',
  });

  const title_block_info = cn({
    [style.title_grid_info]: selectedView === 'grid',
    [style.title_list_info]: selectedView === 'list',
  });

  const description_block_info = cn({
    [style.description_grid_info]: selectedView === 'grid',
    [style.description_list_info]: selectedView === 'list',
  });

  const sales_menu = cn({
    [style.sales_grid_menu]: selectedView === 'grid',
    [style.sales_list_menu]: selectedView === 'list',
  });

  const salesman_info =
    selectedView === 'grid' ? (
      <>
        <div className={style.salesman_grid_data} />
        <span className={style.forward_slash}>/</span>
        <div className={style.number_reviews} />
      </>
    ) : (
      <>
        <div className={style.salesman_logo} />
        <div className={style.salesman_list_data} />
      </>
    );

  return (
    <div className={skeleton_mods}>
      <div className={image_container} />
      <div className={details_block}>
        <div className={style.title_container}>
          <div className={title_block_info} />
          <div className={description_block_info} />
        </div>
        <div className={sales_menu}>
          <div className={style.sales_info_block}>{salesman_info}</div>
          {selectedView === 'list' && <div className={style.sales_orders} />}
        </div>
        <div className={style.stars_container}>
          <Stars reward={0} />
          {selectedView === 'list' && (
            <>
              <span className={style.forward_slash}>/</span>
              <div className={style.number_reviews} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
