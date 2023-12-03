import React, { useState } from 'react';

import cn from 'classnames';

import { ArrowIcon } from 'assets/icons/index';

import style from './Bundles.module.scss';

const TEMP = [
  {
    id: 1,
    name: 'Bundle',
  },
  {
    id: 2,
    name: 'Bundle',
  },
  {
    id: 3,
    name: 'Bundle',
  },
  {
    id: 4,
    name: 'Bundle',
  },
  {
    id: 5,
    name: 'Bundle',
  },
  {
    id: 6,
    name: 'Bundle',
  },
  {
    id: 7,
    name: 'Bundle',
  },
];

export const Bundles = (): JSX.Element => {
  const [active, setActive] = useState<number>(1);

  return (
    <div className={style.bundle_wrapper}>
      <ArrowIcon className={style.left_arrow} />
      <div className={style.bundle_container}>
        {TEMP.map(el => {
          return (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
            <div
              key={el.id}
              onClick={() => setActive(el.id)}
              className={cn(style.item, { [style.active]: el.id === active })}
            >
              {el.name}
            </div>
          );
        })}
      </div>
      <ArrowIcon className={style.right_arrow} />
    </div>
  );
};
