import React, { FC, useState } from 'react';

import cn from 'classnames';

import style from './Flag.module.css';
import { ReactComponent as FlagIcon } from 'assets/icons/favourites-add-to.svg';

interface FlagProps {
  className?: string;
  isFavorite?: boolean;
}
const Flag: FC<FlagProps> = ({ className, isFavorite }): JSX.Element => {
  const [flag, setFlag] = useState(isFavorite || false);

  return (
    <div
      role="presentation"
      className={cn(style.flag, className)}
      onClick={e => {
        e.stopPropagation();
        setFlag(!flag);
      }}
    >
      <FlagIcon className={flag ? style.active : ''} />
    </div>
  );
};

export default Flag;
