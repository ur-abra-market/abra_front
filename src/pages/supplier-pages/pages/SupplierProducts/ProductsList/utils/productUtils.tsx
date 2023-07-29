import React from 'react';

import {
  AddNewProduct,
  ArrowSort,
  Copy,
  DeleteTrashCanIcon,
  EditPencilIcon,
  RecentlyDeleted,
} from 'assets/icons';
import {
  ActiveListEnum,
  IActionData,
  IActivateStatus,
  IFilterData,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';
import { AppDispatchType } from 'store/createStore';
import { productActions } from 'store/reducers/productSlice/slice';
import { activateProducts, deActivateProducts } from 'store/reducers/productSlice/thunks';
import { IProductsListRequest } from 'store/reducers/productSlice/types';

// --------------types---------------

interface IColumns {
  id: number;
  name: string;
  arrow?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
}

// ProductsListSettings:

// --------------functions--------------

export const deactivateStatusProducts = (
  dispatch: AppDispatchType,
  deactivatedIds: IActivateStatus[],
): void => {
  if (deactivatedIds.length) {
    const productsId = deactivatedIds.map(el => el.id);

    dispatch(deActivateProducts(productsId));
  }
};

export const activateStatusProducts = (
  dispatch: AppDispatchType,
  activatedIds: IActivateStatus[],
): void => {
  if (activatedIds.length) {
    const productsId = activatedIds.map(el => el.id);

    dispatch(activateProducts(productsId));
  }
};

// TableHeader:

// --------------functions--------------

export const selectAllCheckbox = (
  data: IProductsListRequest[] | undefined,
  checked: boolean,
  dispatch: AppDispatchType,
): void => {
  dispatch(productActions.selectAllProducts(checked));

  if (!checked) {
    dispatch(productActions.setArrayForProductsDeactivation([]));
    dispatch(productActions.setArrayForProductsActivation([]));
  }

  if (checked) {
    const arrayForDeactivate: IActivateStatus[] | undefined = data?.map(el => ({
      id: el.id,
      checked: true,
      status: el.is_active,
    }));

    const arrayForDeactivateProducts = arrayForDeactivate?.filter(el => el.status);
    const arrayForActivateProducts = arrayForDeactivate?.filter(el => !el.status);

    if (arrayForDeactivateProducts) {
      dispatch(
        productActions.setArrayForProductsDeactivation(arrayForDeactivateProducts),
      );
    }
    if (arrayForActivateProducts) {
      dispatch(productActions.setArrayForProductsActivation(arrayForActivateProducts));
    }
  }
};

export const filtersData: IFilterData[] = [
  { id: 1, label: 'All Products', list: ActiveListEnum.ALL_PRODUCTS },
  { id: 2, label: 'On-sale', list: ActiveListEnum.ON_SALE },
  { id: 3, label: 'Off-sale', list: ActiveListEnum.OFF_SALE },
];

export const actionData: IActionData[] = [
  { id: 1, label: 'Edit', Icon: EditPencilIcon },
  { id: 2, label: 'Copy', Icon: Copy },
  { id: 3, label: 'Delete', Icon: DeleteTrashCanIcon },
  { id: 4, label: 'Add a new product', Icon: AddNewProduct },
  { id: 5, label: 'Recently deleted', Icon: RecentlyDeleted },
];

export const columns: IColumns[] = [
  { id: 1, name: 'SKU', arrow: <ArrowSort /> },
  { id: 2, name: 'Picture' },
  { id: 3, name: 'Name' },
  { id: 4, name: 'Creation Date', arrow: <ArrowSort /> },
  { id: 5, name: 'Status', arrow: <ArrowSort /> },
  { id: 6, name: 'Price', arrow: <ArrowSort /> },
  { id: 7, name: 'Balance, units', arrow: <ArrowSort /> },
  { id: 8, name: 'Visibility' },
];
