import React, { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import style from './MenuItems.module.scss';

import { PRODUCTS_LIST } from 'routes';
import { ICategoryResponse } from 'services/common/common.serviceTypes';

export interface IMenuItems {
  items?: ICategoryResponse[];
  focusedItem: string | '';
  focusedItemParent: string | '';
  indexActiveRow: number;
  activeParentId: number;
}

export const MenuItems: FC<IMenuItems> = ({
  items,
  focusedItem,
  focusedItemParent,
  indexActiveRow,
  activeParentId,
}): JSX.Element => {
  const mappedItems = items?.map(item => {
    const selectCategory = cn(style.link, {
      [style.focus_item]: focusedItemParent === item.name && indexActiveRow < 0,
    });

    return (
      <li key={item.id} className={style.list_item}>
        <NavLink className={selectCategory} to={`${PRODUCTS_LIST}/${item.id}`}>
          {item.name}
        </NavLink>

        {item.children?.map(i => {
          const selectChildren = cn(style.items_links, {
            [style.focus_item]:
              focusedItem === i.name &&
              activeParentId === i.parent_id &&
              indexActiveRow !== -1,
          });

          return (
            <div className={selectChildren} key={i.id}>
              {i.name}
            </div>
          );
        })}
      </li>
    );
  });

  return (
    <div className={style.items_wrapper}>
      <div className={cn(style.items_container)}>{mappedItems}</div>
    </div>
  );
};
