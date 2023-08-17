import {
  AddNewProduct,
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
import {
  activateProducts,
  deActivateProducts,
  IProduct,
  selectAllProducts,
  setArrayForProductsActivation,
  setArrayForProductsDeactivation,
  SortType,
} from 'store/reducers/supplier/product';

// --------------types---------------

interface IColumns {
  id: number;
  name: string;
  arrow?: boolean;
  sortKey?: 'ascending' | 'sort' | 'onSale';
  sortValue?: SortType;
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
  data: IProduct[] | undefined,
  checked: boolean,
  dispatch: AppDispatchType,
): void => {
  dispatch(selectAllProducts(checked));

  if (!checked) {
    dispatch(setArrayForProductsDeactivation([]));
    dispatch(setArrayForProductsActivation([]));
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
      dispatch(setArrayForProductsDeactivation(arrayForDeactivateProducts));
    }
    if (arrayForActivateProducts) {
      dispatch(setArrayForProductsActivation(arrayForActivateProducts));
    }
  }
};

export const filtersData: IFilterData[] = [
  { id: 1, label: 'All Products', list: ActiveListEnum.ALL_PRODUCTS },
  // { id: 2, label: 'On-sale', list: ActiveListEnum.ON_SALE },
  // { id: 3, label: 'Off-sale', list: ActiveListEnum.OFF_SALE },
];

export const actionData: IActionData[] = [
  { id: 1, label: 'Edit', Icon: EditPencilIcon },
  { id: 2, label: 'Copy', Icon: Copy },
  { id: 3, label: 'Delete', Icon: DeleteTrashCanIcon },
  { id: 4, label: 'Add a new product', Icon: AddNewProduct },
  { id: 5, label: 'Recently deleted', Icon: RecentlyDeleted },
];

export const columns: IColumns[] = [
  { id: 1, name: 'SKU' },
  { id: 2, name: 'Picture' },
  { id: 3, name: 'Name' },
  {
    id: 4,
    name: 'Creation Date',
    arrow: true,
    sortKey: 'sort',
    sortValue: 'date',
  },
  { id: 5, name: 'Status' },
  { id: 6, name: 'Price', arrow: true, sortKey: 'sort', sortValue: 'price' },
  { id: 7, name: 'Balance, units' },
  { id: 8, name: 'Visibility' },
];
