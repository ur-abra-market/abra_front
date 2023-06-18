import { FC, useState } from 'react';

import cn from 'classnames';

import style from './Flag.module.css';

import { FavouriteAddedToIcon } from 'assets/icons';

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
      <FavouriteAddedToIcon className={flag ? style.active : ''} />
    </div>
  );
};

export default Flag;
