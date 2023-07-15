import React, { FC } from 'react';

import style from './ViewIcons.module.scss';

import {
  ViewGridDisabledIcon,
  ViewGridEnabledIcon,
  ViewListDisabledIcon,
  ViewListEnabledIcon,
} from 'assets/icons';

interface ISelectedView {
  selectedView: ViewType;
  setSelectedView: (view: ViewType) => void;
}

export type ViewType = 'grid' | 'list';

export const ViewGrid: FC<ISelectedView> = ({
  selectedView,
  setSelectedView,
}): JSX.Element => {
  const hanldeIconOnChange = (view: ViewType): void => {
    setSelectedView(view);
  };

  return (
    <div className={style.control_blocks}>
      {selectedView === 'grid' ? (
        <ViewGridEnabledIcon />
      ) : (
        <ViewGridDisabledIcon onClick={() => hanldeIconOnChange('grid')} />
      )}
    </div>
  );
};

export const ViewList: FC<ISelectedView> = ({
  selectedView,
  setSelectedView,
}): JSX.Element => {
  const hanldeIconOnChange = (view: ViewType): void => {
    setSelectedView(view);
  };

  return (
    <div className={style.control_blocks}>
      {selectedView === 'list' ? (
        <ViewListEnabledIcon />
      ) : (
        <ViewListDisabledIcon onClick={() => hanldeIconOnChange('list')} />
      )}
    </div>
  );
};
