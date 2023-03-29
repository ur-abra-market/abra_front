import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface UploadFileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  action: string;
  image?: string;
  label?: string;
  text?: string;
  variant?: 'square' | 'circle';
  size?: 'small' | 'middle' | 'large';
}
