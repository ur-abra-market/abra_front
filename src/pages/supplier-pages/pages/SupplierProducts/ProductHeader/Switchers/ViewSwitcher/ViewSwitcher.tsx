import React, { useState } from 'react';

import cn from 'classnames';

import style from './ViewSwitcher.module.scss';

import { ViewGridDisabledIcon, ViewListDisabledIcon } from 'assets/icons';

export const ViewSwitcher = (): JSX.Element => {
  const [layout, setLayout] = useState('tableLayout');

  const handleLayoutSet = (): void => {
    setLayout(prevState => (prevState === 'tableLayout' ? 'tileLayout' : 'tableLayout'));
  };

  const viewGridClasses = cn({
    [style.active_layout]: layout === 'tileLayout',
    [style.inactive_layout]: layout !== 'tileLayout',
  });

  const viewListClasses = cn({
    [style.active_layout]: layout === 'tableLayout',
    [style.inactive_layout]: layout !== 'tableLayout',
  });

  return (
    <div className={style.layouts}>
      <ViewGridDisabledIcon className={viewGridClasses} onClick={handleLayoutSet} />
      <ViewListDisabledIcon className={viewListClasses} onClick={handleLayoutSet} />
    </div>
  );
};
