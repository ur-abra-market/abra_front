import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface SearchProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type'
  > {
  isPhotoSearch?: boolean;
}
