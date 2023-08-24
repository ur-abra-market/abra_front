import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ILocationAndCurrencySelection
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dropOnUp?: boolean;
  isMobileView?: boolean;
  wrapperClassName?: string;
}
