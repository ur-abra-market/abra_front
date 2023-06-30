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

import { DefaultProductImage } from 'assets/images';

interface ILazyImage extends ImgHTMLAttributes<HTMLImageElement> {
  children?: ReactNode;
}

export const LazyImage: FC<ILazyImage> = ({
  alt,
  src,
  children,
  width,
  height,
  className,
  ...restProps
}): JSX.Element => {
  const [loaded, setLoaded] = useState(false);

  const handleImageError = (event: SyntheticEvent<HTMLImageElement>): void => {
    const newEvent = { ...event };

    setLoaded(true);
    newEvent.currentTarget.src = DefaultProductImage;
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
  }, [width, height]);

  return (
    <div className={cn(style.image_container, { [style.loaded]: loaded })}>
      {children}
      <img
        className={cn(style.image, className)}
        src={src}
        alt={alt}
        height={height}
        width={width}
        onError={handleImageError}
        {...restProps}
      />
    </div>
  );
};
