import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LogoProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  href?: string;
  size?: 'md' | 'sm';
  color?: 'red' | 'black';
}
