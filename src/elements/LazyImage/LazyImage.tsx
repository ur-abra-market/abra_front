import React, {
  FC,
  ImgHTMLAttributes,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useState,
} from 'react';

import cn from 'classnames';

import style from './LazyImage.module.scss';

import defaultImage from 'assets/icons/files/default-image.svg';
import defaultLogoImage from 'assets/icons/files/default-logo-image.svg';
import defaultSupplierItemImage from 'assets/icons/files/default-supplier-item-image.svg';
import defaultUserItemImage from 'assets/images/files/default-product-image.png';

interface ILazyImage extends ImgHTMLAttributes<HTMLImageElement> {
  children?: ReactNode;
  type:
    | 'logo'
    | 'avatar'
    | 'product_image_supplier'
    | 'product_image_user'
    | 'default_image';
}

const defaultImages = {
  logo: defaultLogoImage,
  avatar: defaultLogoImage,
  product_image_supplier: defaultSupplierItemImage,
  product_image_user: defaultUserItemImage,
  default_image: defaultImage,
};

export const LazyImage: FC<ILazyImage> = ({
  alt,
  src,
  children,
  width,
  height,
  className,
  type,
  ...restProps
}): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    const newEvent = { ...event };

    setLoaded(true);
    if (type) newEvent.currentTarget.src = defaultImages[type];
  };

  useEffect(() => {
    const image = new Image(width ? +width : undefined, height ? +height : undefined);

    if (typeof src === 'string') {
      image.src = src;
    }

    const handleLoadingImage = (): void => {
      setLoaded(true);
    };

    if (image.complete) {
      handleLoadingImage();
    } else {
      image.addEventListener('load', handleLoadingImage);

      return () => {
        image.removeEventListener('load', handleLoadingImage);
      };
    }
  }, [width, height, src]);

  return (
    <div className={cn(style.image_container, { [style.loaded]: loaded })}>
      {children}
      <img
        className={cn(className, style.image)}
        src={src}
        alt={alt}
        height={height}
        width={width}
        {...restProps}
        onError={handleImageError}
      />
    </div>
  );
};
