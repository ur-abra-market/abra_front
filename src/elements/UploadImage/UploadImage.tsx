import React, { ChangeEvent, DetailedHTMLProps, FC, HTMLAttributes } from 'react';

import cn from 'classnames';

import style from './UploadImage.module.scss';

import { CrossRedIcon, UploadItemImageIcon, UploadLogoImageIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { LoadingStatusEnum } from 'common/types';
import { LazyImage } from 'elements/LazyImage/LazyImage';
import { setResponseNotice } from 'store/reducers/appSlice/slice';
import { userRoleSelector } from 'store/reducers/authSlice';
import { sellerLoadingSelector } from 'store/reducers/seller/profile';
import { supplierLoadingSelector } from 'store/reducers/supplier/profile';

interface IUploadImage
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  image?: string;
  label?: string;
  placeholder?: string;
  type: 'default' | 'logo' | 'avatar';
  uploadImage?: (img: File) => void;
  deleteImage?: () => void;
  description: string;
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
  ...restProps
}) => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector(userRoleSelector);
  const sellerLoading = useAppSelector(sellerLoadingSelector);
  const supplierLoading = useAppSelector(supplierLoadingSelector);

  const isDisabled =
    (userRole === 'seller' &&
      sellerLoading.avatarLoading === LoadingStatusEnum.Loading) ||
    (userRole === 'supplier' &&
      supplierLoading.companyLogoLoading === LoadingStatusEnum.Loading);

  const uploadImageIcon =
    type === 'logo' || type === 'avatar' ? (
      <UploadLogoImageIcon />
    ) : (
      <UploadItemImageIcon />
    );

  const inputClasses = cn({
    [style.input_logo]: type === 'logo',
    [style.input_avatar]: type === 'avatar',
    [style.input_default]: type !== 'logo' && type !== 'avatar',
  });

  const imgClasses = cn({
    [style.logo_img]: type === 'logo',
    [style.avatar_img]: type === 'avatar',
    [style.default_img]: type !== 'logo' && type !== 'avatar',
  });

  const crossClasses = cn({
    [style.logo_cross]: type === 'logo',
    [style.avatar_cross]: type === 'avatar',
    [style.default_cross]: type !== 'logo' && type !== 'avatar',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target?.files?.length) {
      const file = e.target.files[0];

      if (type === 'logo' && file.size >= MAX_FILE_SIZE) {
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

  return (
    <div className={cn(style.wrapper, className)} {...restProps}>
      <input
        disabled={isDisabled}
        type="file"
        className={inputClasses}
        id="profileLogo"
        onChange={handleOnChange}
      />
      <div className={style.img_wrapper}>
        {image ? (
          <div>
            <LazyImage src={image} alt={description} className={imgClasses} />

            {type === 'default' && (
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
          <label className={style.label} htmlFor="profileLogo">
            {label}
          </label>
          <p className={style.placeholder}>{placeholder}</p>
        </div>
      )}
    </div>
  );
};
