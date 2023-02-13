import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'type'
  > {
  type?: 'submit' | 'button';
  label?: string;
  color?: 'default' | 'red' | 'light-red' | 'white' | 'black';
}
