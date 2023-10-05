import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useState,
} from 'react';

import cn from 'classnames';

import {
  CrossRedIcon,
  DefaultLogoImageIcon,
  DefaultProductImageSupplierIcon,
} from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { setResponseNotice } from 'store/reducers/appSlice/slice';
import { Paragraph } from 'ui-kit';

import style from './UploadImage.module.scss';

interface IUploadImage
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image?: string;
  label?: string;
  placeholder?: string;
  type: 'product_image_supplier' | 'logo' | 'avatar';
  uploadImage?: (img: File) => void;
  deleteImage?: () => void;
  description: string;
  isDisabled?: boolean;
}

const MAX_FILE_SIZE = 5000000;

export const UploadImage: FC<IUploadImage> = ({
  className,
  image,
  type,
  label,
  placeholder,
  deleteImage,
  uploadImage,
  description,
  isDisabled,
  ...restProps
}) => {
  const dispatch = useAppDispatch();
  const [isFocused, setIsFocused] = useState<boolean>(false);

  const inputClasses = cn({
    [style.input_logo]: type === 'logo',
    [style.input_avatar]: type === 'avatar',
    [style.input_default]: type !== 'logo' && type !== 'avatar',
    [style.input_disabled]: isDisabled,
  });

  const imgClasses = cn({
    [style.logo_img]: type === 'logo',
    [style.avatar_img]: type === 'avatar',
    [style.focus_img]: (type === 'logo' || type === 'avatar') && isFocused,
    [style.default_img]: type !== 'logo' && type !== 'avatar',
  });

  const crossClasses = cn({
    [style.logo_cross]: type === 'logo',
    [style.avatar_cross]: type === 'avatar',
    [style.default_cross]: type !== 'logo' && type !== 'avatar',
  });

  const labelClasses = cn(style.label, {
    [style.label_disabled]: isDisabled,
  });

  const handleUploadImage = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target?.files?.length) {
      const file = e.target.files[0];

      if ((type === 'logo' || type === 'avatar') && file.size >= MAX_FILE_SIZE) {
        dispatch(
          setResponseNotice({
            noticeType: 'error',
            message: 'Sorry, max logo size 5 mb',
          }),
        );
      } else if (uploadImage) uploadImage(file);

      // eslint-disable-next-line no-param-reassign
      e.target.value = '';
    }
  };

  const uploadImageIcon =
    type === 'product_image_supplier' ? (
      <DefaultProductImageSupplierIcon />
    ) : (
      <DefaultLogoImageIcon />
    );

  return (
    <div className={cn(style.wrapper, className)} {...restProps}>
      <input
        disabled={isDisabled}
        type="file"
        className={inputClasses}
        id="profileLogo"
        onChange={handleUploadImage}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      <div className={style.img_wrapper}>
        {image ? (
          <div>
            <LazyImage src={image} alt={description} className={imgClasses} type={type} />

            {type === 'product_image_supplier' && (
              <button className={crossClasses} onClick={deleteImage} type="button">
                <CrossRedIcon />
              </button>
            )}
          </div>
        ) : (
          uploadImageIcon
        )}
      </div>

      {(type === 'logo' || type === 'avatar') && (
        <div className={style.description}>
          <label className={labelClasses} htmlFor="profileLogo">
            {label}
          </label>
          <Paragraph size="xs" className={style.placeholder}>
            {placeholder}
          </Paragraph>
        </div>
      )}
    </div>
  );
};
