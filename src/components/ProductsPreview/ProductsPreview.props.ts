import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ProductsPreviewProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: string;
  href?: string;
}
