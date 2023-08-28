import { IActionData, IColumns } from './types';

import {
  AddNewProduct,
  Copy,
  DeleteTrashCanIcon,
  EditPencilIcon,
  RecentlyDeleted,
} from 'assets/icons';

export const productEditorData: IActionData[] = [
  { id: 1, label: 'Edit', Icon: EditPencilIcon },
  // { id: 2, label: 'Copy', Icon: Copy },
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
    sortKey: 'sort',
    sortValue: 'date',
  },
  { id: 5, name: 'Status' },
  { id: 6, name: 'Price', arrow: true, sortKey: 'sort', sortValue: 'price' },
  {
    id: 7,
    name: 'Balance, units',
    arrow: true,
    sortKey: 'sort',
    sortValue: 'total_orders',
  },
  {
    id: 8,
    name: 'Rating',
    arrow: true,
    sortKey: 'sort',
    sortValue: 'rating',
  },
  { id: 9, name: 'Visibility' },
];
