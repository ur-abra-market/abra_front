import React, { useState } from 'react';

import cn from 'classnames';
import { useSelector } from 'react-redux';

import style from './ProductsListSettings.module.scss';
import { SettingItem } from './SettingItem/SettingItem';
import { ActiveListEnum } from './types/products-types';

import { useAppDispatch } from 'common/hooks';
import {
  actionData,
  activateStatusProducts,
  deactivateStatusProducts,
  filtersData,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/utils/productUtils';
import { getActivatedIds, getDeactivatedIds } from 'store/reducers/supplier/product';

export const ProductsListSettings = (): JSX.Element => {
  const [activeList, setActiveList] = useState<ActiveListEnum>(
    ActiveListEnum.ALL_PRODUCTS,
  );
  const dispatch = useAppDispatch();
  const deactivatedProductsIds = useSelector(getDeactivatedIds);
  const activatedProductsIds = useSelector(getActivatedIds);

  const deactivateProducts = (): void => {
    deactivateStatusProducts(dispatch, deactivatedProductsIds);
  };

  const activateProducts = (): void => {
    activateStatusProducts(dispatch, activatedProductsIds);
  };

  // show only 'Add a new product' и 'Recently deleted'
  const filteredData = actionData.filter(el => el.id === 4 || el.id === 5);

  // show either all buttons or only 'Add a new product' and 'Recently deleted'
  const renderedData = deactivatedProductsIds.length ? actionData : filteredData;

  const onSetListByFilter = (list: ActiveListEnum): void => {
    setActiveList(list);
  };

  const getActiveClasses = (activeList: string, currentList: string): string =>
    cn(style.filter, {
      [style.active]: activeList === currentList,
    });

  const getFuncForId = (id: number): undefined | (() => void) => {
    if (id === 3) {
      return deactivateProducts;
    }
    if (id === 5) {
      return activateProducts;
    }

    return undefined;
  };

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

      <div className={`${style.wrapper} ${style.gap}`}>
        {renderedData.map(({ id, label, Icon }) => {
          const disabledBtn = id === 5 && !activatedProductsIds.length;

          return (
            <SettingItem
              key={id}
              classname={style.filter}
              Icon={Icon}
              text={label}
              onClick={getFuncForId(id)}
              disabled={disabledBtn}
            />
          );
        })}
      </div>
    </div>
  );
};
