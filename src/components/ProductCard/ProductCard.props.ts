import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { IShortCardProduct } from '../../interfaces';

export interface ProductCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IShortCardProduct;
}
