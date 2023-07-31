import React from 'react';

export enum ActiveListEnum {
  ALL_PRODUCTS = 'all products',
  ON_SALE = 'on sale',
  OFF_SALE = 'off sale',
}

export interface IFilterData {
  id: number;
  label: string;
  list: ActiveListEnum;
}

export interface IActionData {
  id: number;
  label: string;
  Icon: React.VFC<React.SVGProps<SVGSVGElement>>;
}

export interface ISettingItem {
  classname?: string;
  text: string;
  Icon?: React.VFC<React.SVGProps<SVGSVGElement>>;
  onClick?: () => void;
  disabled?: boolean;
}

export interface IActivateStatus {
  id: number;
  checked: boolean;
  status: boolean;
}
