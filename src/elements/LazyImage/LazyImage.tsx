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

import uploadItemImage from 'assets/icons/files/upload-item-image.svg';
import uploadLogoImage from 'assets/icons/files/upload-logo-image.svg';

interface ILazyImage extends ImgHTMLAttributes<HTMLImageElement> {
  children?: ReactNode;
  type?: 'logo' | 'avatar' | 'default';
}

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
  const defaultImages = type === 'logo' ? uploadLogoImage : uploadItemImage;
  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    const newEvent = { ...event };

    setLoaded(true);
    newEvent.currentTarget.src = defaultImages;
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
