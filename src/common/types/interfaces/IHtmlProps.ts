import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface IHtmlProps<T extends HTMLElement = HTMLDivElement>
  extends DetailedHTMLProps<HTMLAttributes<T>, T> {}
