import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import { ITag } from 'store/reducers/productSlice/types';

import style from './Tags.module.scss';

interface ITagsProps {
  tags: ITag[];
}

export const Tags: FC<ITagsProps> = ({ tags }): JSX.Element => {
  // const temp = tags.length === 0 ? ['Clothes for women', 'Dress', 'Spring-Summer'] : tags; // когда бэк будет что-то возврвщвть удалить

  return (
    <ul className={style.items}>
      {tags.map(el => (
        <li className={style.item} key={el.id}>
          <NavLink className={style.link} to="#">
            {el.name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
