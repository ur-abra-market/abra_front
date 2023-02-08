import React, { FC } from 'react';

import { ReactComponent as FlagIcon } from '../../../Flag/flag.svg';

import style from './FlagFavorites.module.css';

interface FlagFavoritesProps {
  onClick: any;
  active: boolean;
}
const FlagFavorites: FC<FlagFavoritesProps> = ({ active, onClick }) => {
  return (
    <div className={style.flagFavorites} onClick={() => onClick(!active)}>
      <div className={style.flagFavorites_sign}>
        <FlagIcon className={active ? style.active : ''} />
      </div>
      <div
        className={style.flagFavorites_text}
        style={!active ? { color: '#828282' } : { color: '#FC133D' }}
      >
        Added to Favorites
      </div>
    </div>
  );
};

export default FlagFavorites;
