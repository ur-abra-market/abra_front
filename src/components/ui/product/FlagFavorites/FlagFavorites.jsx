import React from 'react';

import PropTypes from 'prop-types';

import { ReactComponent as FlagIcon } from '../../../common/Flag/flag.svg';

import style from './FlagFavorites.module.css';

const FlagFavorites = ({ active, onClick }) => {
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

FlagFavorites.propTypes = {
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

export default FlagFavorites;
