import React from 'react';

import style from './Loader.module.css';

const Loader = () => {
  return (
    <div className={style.loader}>
      <div className={style.loader_indicator} />
    </div>
  );
};

export default Loader;
