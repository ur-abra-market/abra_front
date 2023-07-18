import React from 'react';

export enum ActiveList {
  ALL_PRODUCTS = 'all products',
  ON_SALE = 'on sale',
  OFF_SALE = 'off sale',
}

export interface IFilterData {
  id: number;
  label: string;
  list: ActiveList;
}

export interface IActionData {
  id: number;
  label: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
  action?: boolean;
}

export interface ISettingItemProps {
  classname?: string;
  text: string;
  Icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
}
