import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface CheckboxProps
  extends Omit<
    DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
    'type' | 'size'
  > {
  variant?: 'notification' | 'default';
  label?: string;
  size?: 'md' | 'sm';
}
