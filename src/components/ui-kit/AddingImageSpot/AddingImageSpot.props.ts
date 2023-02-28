import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface AddingImageSpotProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  logo?: string;
  imgUrl?: string;
  setImgUrl?: () => void;
  error?: string;
  register?: any;
  images: string[];
  setImages?: any;
  label?: string;
  placeholder?: string;
  onClose?: () => void;
}
