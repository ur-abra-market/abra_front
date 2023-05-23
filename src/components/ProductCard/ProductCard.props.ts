import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { IProductCompilation } from '../../services/product/product.serviceTypes';

export interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductCompilation;
}
