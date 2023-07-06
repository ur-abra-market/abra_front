import React, { FC } from 'react';

import { NavLink } from 'react-router-dom';

import style from './Tags.module.scss';

interface ITagsProps {
  tags: string[];
}

export const Tags: FC<ITagsProps> = ({ tags }): JSX.Element => {
  const temp = tags.length === 0 ? ['Clothes for women', 'Dress', 'Spring-Summer'] : tags; // когда бэк будет что-то возврвщвть удалить

  return (
    <ul className={style.items}>
      {temp.map(el => (
        <li className={style.item} key={el}>
          <NavLink className={style.link} to="#">
            {el}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};
