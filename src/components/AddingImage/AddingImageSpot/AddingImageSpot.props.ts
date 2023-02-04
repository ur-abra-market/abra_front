// export interface AddingImageSpotProps {
//   images: string[];
//   logo: string;
// }

export interface AddingImageSpotProps {
  imgUrl: string;
  setImgUrl: () => void;
  classes: any;
  error: string;
  register: any;
  images: string[];
  setImages: () => void;
  label: string;
  placeholder: string;
  onClose: () => void;
}
