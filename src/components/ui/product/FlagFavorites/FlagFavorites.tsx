import React, { FC } from 'react';

import { ReactComponent as FlagIcon } from '../../../Flag/flag.svg';

import style from './FlagFavorites.module.css';

interface FlagFavoritesProps {
  onClick: any;
  active: boolean;
}
const FlagFavorites: FC<FlagFavoritesProps> = ({ active, onClick }): JSX.Element => {
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div className={style.flag_favorites} onClick={() => onClick(!active)}>
      <div className={style.flag_favorites_sign}>
        <FlagIcon className={active ? style.active : ''} />
      </div>
      <div
        className={style.flag_favorites_text}
        style={!active ? { color: '#828282' } : { color: '#FC133D' }}
      >
        Added to Favorites
      </div>
    </div>
  );
};

export default FlagFavorites;
