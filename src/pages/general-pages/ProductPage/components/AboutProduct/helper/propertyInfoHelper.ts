import { IPropertyValue } from 'store/reducers/productSlice/types';

export const propertyInfoHelper = (info: IPropertyValue[]): string => {
  return info.reduce((prev, curr, index) => {
    if (index === 0) {
      return curr.value;
    }

    return `${prev}, ${curr.value}`;
  }, '');
};
