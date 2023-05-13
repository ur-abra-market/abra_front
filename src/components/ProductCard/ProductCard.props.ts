import { DetailedHTMLProps, HTMLAttributes } from 'react';

import { I_SimilarProduct } from '../../interfaces';

export interface ProductCardProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: I_SimilarProduct;
}
