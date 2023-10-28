import { FC } from 'react';

import cn from 'classnames';

import { ViewGridEnabledIcon, ViewListEnabledIcon } from 'assets/icons';
import { SelectedViewEnum } from 'common/types';

import style from './PageViewSwitcher.module.scss';

interface IPageViewSwitcher {
  selectedView: SelectedViewEnum;
  setSelectedView: (view: SelectedViewEnum) => void;
}

export const PageViewSwitcher: FC<IPageViewSwitcher> = ({
  selectedView,
  setSelectedView,
}) => {
  const viewGridClasses = {
    [style.active_layout]: selectedView === SelectedViewEnum.GRID,
  };

  const viewListClasses = cn({
    [style.active_layout]: selectedView === SelectedViewEnum.LIST,
  });

  return (
    <div className={style.wrapper}>
      <ViewGridEnabledIcon
        className={cn(style.default_icon, viewGridClasses)}
        onClick={() => setSelectedView(SelectedViewEnum.GRID)}
      />

      <ViewListEnabledIcon
        className={cn(style.default_icon, viewListClasses)}
        onClick={() => setSelectedView(SelectedViewEnum.LIST)}
      />
    </div>
  );
};
