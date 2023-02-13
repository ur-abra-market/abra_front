import { DetailedHTMLProps, InputHTMLAttributes } from 'react';

export interface InputProps
  extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  classNameWrapper?: string;
  error?: string;
  type?: 'text' | 'textarea';
}
