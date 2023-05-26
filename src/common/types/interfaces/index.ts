export interface IAccountPersonalInfo {
  firstName: string;
  lastName: string;
  phoneNumber: string;
}

export interface IImageProduct {
  image_url: string;
  serial_number: number;
}

// for importing image components
export interface ImageComponents {
  [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}
