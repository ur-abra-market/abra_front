import React, { FC } from 'react';

import cn from 'classnames';

import { SelectedViewEnum } from 'common/types';
import { Stars } from 'ui-kit';

import style from './SkeletonProductCard.module.scss';

interface IProductSkeleton {
  selectedView: SelectedViewEnum;
}

export const SkeletonProductCard: FC<IProductSkeleton> = ({
  selectedView,
}): JSX.Element => {
  const skeletonClasses = cn(style.skeleton, {
    [style.skeleton_grid_view]: selectedView === SelectedViewEnum.GRID,
    [style.skeleton_list_view]: selectedView === SelectedViewEnum.LIST,
  });

  const supplier =
    selectedView === SelectedViewEnum.GRID ? (
      <>
        <div className={style.before_slash_line} />
        <span className={style.slash}>/</span>
        <div className={style.after_slash_line} />
      </>
    ) : (
      <>
        <div className={style.round_line} />
        <div className={style.before_slash_line} />
      </>
    );

  return (
    <div className={skeletonClasses}>
      <div className={style.image} />
      <div className={style.details}>
        <div className={style.header_lines_container}>
          <div className={style.header_first_line} />
          <div className={style.header_second_line} />
        </div>
        <div className={style.supplier_info_container}>
          <div className={style.info_lines}>{supplier}</div>
          {selectedView === SelectedViewEnum.LIST && (
            <div className={style.additional_line} />
          )}
        </div>
        <div className={style.stars_container}>
          <Stars reward={0} />
          {selectedView === SelectedViewEnum.LIST && (
            <>
              <span className={style.slash}>/</span>
              <div className={style.after_slash_line} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};
