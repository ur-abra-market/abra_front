import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface EditableInputWrapperProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string;
  onChangeValue: (value: string) => void;
  type: 'text' | 'password';
  onSave?: (name: string, value?: string) => void;
  name?: 'email' | 'password' | 'phone';
}
