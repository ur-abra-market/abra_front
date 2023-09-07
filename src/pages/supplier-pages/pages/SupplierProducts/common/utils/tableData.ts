import { QUERY_PARAMS_VALUE } from './queryParameters';

import {
  AddNewProduct,
  DeleteTrashCanIcon,
  EditPencilIcon,
  RecentlyDeleted,
} from 'assets/icons';
import {
  IActionData,
  IColumns,
} from 'pages/supplier-pages/pages/SupplierProducts/common/types/types';

export const productEditorData: IActionData[] = [
  { id: 1, label: 'Edit', Icon: EditPencilIcon },
  { id: 3, label: 'Deactivated product', Icon: DeleteTrashCanIcon },
  { id: 4, label: 'Activated product', Icon: RecentlyDeleted },
  { id: 5, label: 'Add a new product', Icon: AddNewProduct },
];

export const tableSortData: IColumns[] = [
  { id: 1, name: 'SKU' },
  { id: 2, name: 'Picture' },
  { id: 3, name: 'Name' },
  {
    id: 4,
    name: 'Creation Date',
    arrow: true,
    sortValue: QUERY_PARAMS_VALUE.DATE,
  },
  { id: 5, name: 'Status' },
  { id: 6, name: 'Price', arrow: true, sortValue: QUERY_PARAMS_VALUE.PRICE },
  {
    id: 7,
    name: 'Balance, units',
    arrow: true,
    sortValue: QUERY_PARAMS_VALUE.TOTAL_ORDERS,
  },
  {
    id: 8,
    name: 'Rating',
    arrow: true,
    sortValue: QUERY_PARAMS_VALUE.RATING,
  },
  { id: 9, name: 'Visibility' },
];
