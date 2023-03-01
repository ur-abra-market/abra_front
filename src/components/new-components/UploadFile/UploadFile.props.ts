import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface UploadFileProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  action: string;
  image?: string;
}
