import { ISelectOption } from 'ui-kit';

export const STATUS_SELECT: ISelectOption[] = [
  { label: { text: 'All' }, value: -1 },
  { label: { text: 'Active' }, value: 1 },
  { label: { text: 'Inactive' }, value: 0 },
];

export const SALE_SELECT: ISelectOption[] = [
  { label: { text: 'All' }, value: -1 },
  { label: { text: 'On sale' }, value: 1 },
  { label: { text: 'Off sale' }, value: 0 },
];

export const CATEGORY_SELECT: ISelectOption[] = [
  { label: { text: 'All' }, value: 0 },
  { label: { text: 'Clothes' }, value: 3 },
  { label: { text: 'Cosmetics' }, value: 4 },
  { label: { text: 'Accessories' }, value: 5 },
];
