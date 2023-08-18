import React, { FC, KeyboardEvent, RefObject, useEffect, useRef } from 'react';

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
  const mappedItems = items?.map(item => (
    <li key={item.id} className={style.list_item}>
      <NavLink
        className={`${style.link} ${
          focusedItemParent === item.name && indexActiveRow < 0 && style.focus_item
        }`}
        to={`${PRODUCTS_LIST}/${item.id}`}
      >
        {item.name}
      </NavLink>

      {item.children?.map(i => {
        const focusElement =
          focusedItem === i.name &&
          activeParentId === i.parent_id &&
          indexActiveRow !== -1;

        return (
          <div
            className={`${style.items_links} ${focusElement && style.focus_item}`}
            key={i.id}
          >
            {i.name}
          </div>
        );
      })}
    </li>
  ));

  return (
    <div className={style.items_wrapper}>
      <div className={cn(style.items_container)}>{mappedItems}</div>
    </div>
  );
};
