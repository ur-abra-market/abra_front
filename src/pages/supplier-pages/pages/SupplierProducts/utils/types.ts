import React from 'react';

import { SortType } from 'store/reducers/supplier/product';

export interface IActionData {
  id: number;
  label: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface IColumns {
  id: number;
  name: string;
  arrow?: boolean;
  sortKey?: 'ascending' | 'sort' | 'price' | 'total_orders';
  sortValue?: SortType;
}
