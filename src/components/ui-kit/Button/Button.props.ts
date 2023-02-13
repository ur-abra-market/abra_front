import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'type'
  > {
  type?: 'submit' | 'button';
  label?: string;
}
