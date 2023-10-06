import { FC } from 'react';

import cn from 'classnames';

import { ViewGridEnabledIcon, ViewListEnabledIcon } from 'assets/icons';

import style from './PageViewSwitcher.module.scss';

interface IPageViewSwitcher {
  selectedView: ViewType;
  setSelectedView: (view: ViewType) => void;
}

export type ViewType = 'grid' | 'list';

export const PageViewSwitcher: FC<IPageViewSwitcher> = ({
  selectedView,
  setSelectedView,
}) => {
  const viewGridClasses = {
    [style.active_layout]: selectedView === 'grid',
  };

  const viewListClasses = cn({
    [style.active_layout]: selectedView === 'list',
  });

  return (
    <div className={style.wrapper}>
      <ViewGridEnabledIcon
        className={cn(style.default_icon, viewGridClasses)}
        onClick={() => setSelectedView('grid')}
      />

      <ViewListEnabledIcon
        className={cn(style.default_icon, viewListClasses)}
        onClick={() => setSelectedView('list')}
      />
    </div>
  );
};
