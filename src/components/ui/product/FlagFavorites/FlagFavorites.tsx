import React, { FC } from 'react';

import cn from 'classnames';

import { ReactComponent as FlagIcon } from '../../../Flag/flag.svg';
import { Button } from '../../../ui-kit';

import style from './FlagFavorites.module.css';

interface FlagFavoritesProps {
  onClick: any;
  active: boolean;
}
const FlagFavorites: FC<FlagFavoritesProps> = ({ active, onClick }): JSX.Element => {
  return (
    <Button
      color="white"
      className={style.flag_favorites}
      onClick={() => onClick(!active)}
    >
      <div className={style.flag_favorites_sign}>
        <FlagIcon className={cn({ [style.active]: active })} />
      </div>
      <div
        className={style.flag_favorites_text}
        style={!active ? { color: '#828282' } : { color: '#FC133D' }}
      >
        Added to Favorites
      </div>
    </Button>
  );
};

export default FlagFavorites;
