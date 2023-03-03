import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';

export interface IOption {
  label: string;
  value: string | number;
}
export interface SelectProps
  extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options?: IOption;
  error?: string;
}
