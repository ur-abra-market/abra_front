import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { IProductCompilation } from '../../interfaces';

export interface IProductCard
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductCompilation;
}
