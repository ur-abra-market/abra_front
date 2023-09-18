import { ISelectOption } from 'ui-kit';

const selectValues = {
  ALL: 'all',
  STATUS: 'active',
  INACTIVE: 'inactive',
  ON_SALE: 'on_sale',
  OFF_SALE: 'off_sale',
};

const selectLabels = {
  ALL: 'All',
  STATUS: 'Active',
  INACTIVE: 'Inactive',
  ON_SALE: 'On sale',
  OFF_SALE: 'Off sale',
};

export const STATUS_SELECT: ISelectOption[] = [
  { label: { text: selectLabels.ALL }, value: selectValues.ALL },
  { label: { text: selectLabels.STATUS }, value: selectValues.STATUS },
  { label: { text: selectLabels.INACTIVE }, value: selectValues.INACTIVE },
];

export const SALE_SELECT: ISelectOption[] = [
  { label: { text: selectLabels.ALL }, value: selectValues.ALL },
  { label: { text: selectLabels.ON_SALE }, value: selectValues.ON_SALE },
  { label: { text: selectLabels.OFF_SALE }, value: selectValues.OFF_SALE },
];

export const CATEGORY_SELECT: ISelectOption[] = [
  { label: { text: selectLabels.ALL }, value: selectValues.ALL },
  { label: { text: 'Clothes' }, value: 3 },
  { label: { text: 'Cosmetics' }, value: 4 },
  { label: { text: 'Accessories' }, value: 5 },
];
