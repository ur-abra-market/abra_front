import { FC } from 'react';

import cn from 'classnames';

import style from './PageViewSwitcher.module.scss';

import { ViewGridEnabledIcon, ViewListEnabledIcon } from 'assets/icons';

interface ISelectedView {
  selectedView: ViewType;
  setSelectedView: (view: ViewType) => void;
}

export type ViewType = 'grid' | 'list';

export const PageViewSwitcher: FC<ISelectedView> = ({
  selectedView,
  setSelectedView,
}) => {
  const viewGridClasses = {
    [style.active_layout]: selectedView === 'grid',
  };

  const viewListClasses = cn({
    [style.active_layout]: selectedView === 'list',
  });

  const handleSetViewGrid = (): void => setSelectedView('grid');
  const handleSetViewList = (): void => setSelectedView('list');

  return (
    <div className={style.layouts}>
      <ViewGridEnabledIcon
        className={cn(style.default_icon, viewGridClasses)}
        onClick={handleSetViewGrid}
      />
      <ViewListEnabledIcon
        className={cn(style.default_icon, viewListClasses)}
        onClick={handleSetViewList}
      />
    </div>
  );
};
