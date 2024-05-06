import { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router-dom';

import { PRODUCTS_LIST } from 'routes';
import { ICategoryResponse } from 'services/common/common.serviceTypes';

import style from './MenuItems.module.scss';

export interface IMenuItems {
  items?: ICategoryResponse[];
  selectedCategory: string | '';
  selectedCategoryItem: string | '';
  indexActiveRow: number;
  activeParentId: number;
}

export const MenuItems: FC<IMenuItems> = ({
  items,
  selectedCategory,
  selectedCategoryItem,
  indexActiveRow,
  activeParentId,
}): JSX.Element => {
  const mappedItems = items?.map(item => {
    const selectCategory = cn(style.link, {
      [style.focus_item]: selectedCategoryItem === item.name && indexActiveRow < 0,
    });

    return (
      <li key={item.id} className={style.list_item}>
        <NavLink
          className={selectCategory}
          to={`${PRODUCTS_LIST}?category_id=${item.id}`}
        >
          {item.name}
        </NavLink>

        {item.children?.map(i => {
          const selectChildren = cn(style.items_links, {
            [style.focus_item]:
              selectedCategory === i.name &&
              activeParentId === i.parent_id &&
              indexActiveRow !== -1,
          });

          return (
            <NavLink to={`${PRODUCTS_LIST}?category_id=${i.id}`} key={i.id}>
              <div className={selectChildren}>{i.name}</div>
            </NavLink>
          );
        })}
      </li>
    );
  });

  return <div className={cn(style.items_container)}>{mappedItems}</div>;
};
