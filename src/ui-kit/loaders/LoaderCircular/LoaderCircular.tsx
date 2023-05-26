import React from 'react';

import style from './LoaderCircular.module.css';

export const LoaderCircular = (): JSX.Element => {
  return (
    <div className={style.loader}>
      <div className={style.loader_indicator} />
    </div>
  );
};
