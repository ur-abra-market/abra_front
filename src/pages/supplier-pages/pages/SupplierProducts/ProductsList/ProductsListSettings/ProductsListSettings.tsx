import React, { useState } from 'react';

import cn from 'classnames';

import { actionData, filtersData } from './consts/data';
import style from './ProductsListSettings.module.scss';
import { SettingItem } from './SettingItem/SettingItem';
import { ActiveList } from './types/products-types';

export const ProductsListSettings = (): JSX.Element => {
  const [activeList, setActiveList] = useState<ActiveList>(ActiveList.ALL_PRODUCTS);

  // тестовый стейт. Имитируем что чекбокс выделен на странице
  const [isCheckboxSelected, setIsCheckboxSelected] = useState(false);

  const onSetListByFilter = (list: ActiveList): void => {
    setActiveList(list);
  };

  // эти элементы будут всегда отображаться 'Add a new product' и 'Recently deleted'
  const filteredData = actionData.filter(el => el.id === 4 || el.id === 5);

  const renderedData = isCheckboxSelected ? actionData : filteredData;

  const getActiveClasses = (activeList: string, currentList: string): string =>
    cn(style.filter, {
      [style.active]: activeList === currentList,
    });

  return (
    <div className={style.container}>
      <div className={style.wrapper}>
        {filtersData.map(({ id, label, list }) => (
          <SettingItem
            key={id}
            text={label}
            classname={getActiveClasses(activeList, list)}
            onClick={() => onSetListByFilter(list)}
          />
        ))}
      </div>

      <div className={style.wrapper}>
        {renderedData.map(({ id, label, Icon }) => (
          <SettingItem key={id} text={label} Icon={Icon} />
        ))}
      </div>
    </div>
  );
};
