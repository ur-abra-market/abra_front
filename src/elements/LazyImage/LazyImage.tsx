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

import defaultLogoImage from 'assets/icons/files/default-logo-image.svg';
import defaultSupplierItemImage from 'assets/icons/files/default-supplier-item-image.svg';
import defaultUserItemImage from 'assets/images/files/default-product-image.png';

interface ILazyImage extends ImgHTMLAttributes<HTMLImageElement> {
  children?: ReactNode;
  type?: 'logo' | 'avatar' | 'supplier_default' | 'user_default';
}

const defaultImages = {
  logo: defaultLogoImage,
  avatar: defaultLogoImage,
  supplier_default: defaultSupplierItemImage,
  user_default: defaultUserItemImage,
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

    const handleImageLoad = (): void => {
      setLoaded(true);
    };

    if (image.complete) {
      handleImageLoad();
    } else {
      image.addEventListener('load', handleImageLoad);

      return () => {
        image.removeEventListener('load', handleImageLoad);
      };
    }
  }, [width, height, src]);

  return (
    <div className={cn(style.image_container, { [style.loaded]: loaded })}>
      {children}
      <img
        className={cn(style.image, className)}
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
