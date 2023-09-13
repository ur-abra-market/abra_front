import React from 'react';

import { IProductSortOptions, SortType } from 'store/reducers/supplier/product';

export interface IActionData {
  id: number;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface IColumns {
  id: number;
  name: string;
  arrow?: boolean;
  sortValue?: SortType;
}

export interface ISearchParams extends Omit<IProductSortOptions, 'offset'> {
  page: number;
}
