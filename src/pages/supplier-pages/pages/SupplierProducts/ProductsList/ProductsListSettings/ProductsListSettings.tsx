import React from 'react';

import { useSelector } from 'react-redux';

import style from './ProductsListSettings.module.scss';
import { SettingItem } from './SettingItem/SettingItem';

import { useAppDispatch } from 'common/hooks';
import {
  actionData,
  activateStatusProducts,
  deactivateStatusProducts,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/utils/productUtils';
import { getActiveIds, getDeactivatedIds } from 'store/reducers/supplier/product';

export const ProductsListSettings = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const deactivatedProductsIds = useSelector(getDeactivatedIds);
  const activatedProductsIds = useSelector(getActiveIds);

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
