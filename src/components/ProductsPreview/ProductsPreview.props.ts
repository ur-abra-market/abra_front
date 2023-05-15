import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductsPreviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  category?: string;
  changeCategoryOffset?: (category_id: number) => void;
  href?: string;
}
