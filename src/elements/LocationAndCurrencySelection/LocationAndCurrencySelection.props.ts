import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LocationAndCurrencySelectionProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dropOnUp?: boolean;
}
