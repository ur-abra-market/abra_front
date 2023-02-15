import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface InfoBtnProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'children'
  > {}
