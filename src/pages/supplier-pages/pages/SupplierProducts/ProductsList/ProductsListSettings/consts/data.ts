import {
  AddNewProduct,
  Copy,
  DeleteTrashCanIcon,
  EditPencilIcon,
  RecentlyDeleted,
} from 'assets/icons';
import {
  ActiveList,
  IActionData,
  IFilterData,
} from 'pages/supplier-pages/pages/SupplierProducts/ProductsList/ProductsListSettings/types/products-types';

export const filtersData: IFilterData[] = [
  { id: 1, label: 'All Products', list: ActiveList.ALL_PRODUCTS },
  { id: 2, label: 'On-sale', list: ActiveList.ON_SALE },
  { id: 3, label: 'Off-sale', list: ActiveList.OFF_SALE },
];

export const actionData: IActionData[] = [
  { id: 1, label: 'Edit', Icon: EditPencilIcon },
  { id: 2, label: 'Copy', Icon: Copy },
  { id: 3, label: 'Delete', Icon: DeleteTrashCanIcon },
  { id: 4, label: 'Add a new product', Icon: AddNewProduct },
  { id: 5, label: 'Recently deleted', Icon: RecentlyDeleted },
];
