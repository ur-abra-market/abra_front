import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { ISimilarProduct } from '../../interfaces';

export interface ProductCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: ISimilarProduct;
}
