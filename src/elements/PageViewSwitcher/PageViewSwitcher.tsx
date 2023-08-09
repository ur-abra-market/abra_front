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
  const viewGridClasses = cn({
    [style.active_layout]: selectedView === 'grid',
    [style.inactive_layout]: selectedView !== 'grid',
  });

  const viewListClasses = cn({
    [style.active_layout]: selectedView === 'list',
    [style.inactive_layout]: selectedView !== 'list',
  });

  const handleSetViewGrid = (): void => setSelectedView('grid');
  const handleSetViewList = (): void => setSelectedView('list');

  return (
    <div className={style.layouts}>
      <ViewGridEnabledIcon
        width={20}
        height={20}
        className={viewGridClasses}
        onClick={handleSetViewGrid}
      />
      <ViewListEnabledIcon
        width={20}
        height={20}
        className={viewListClasses}
        onClick={handleSetViewList}
      />
    </div>
  );
};
