import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
} from 'react';

import cn from 'classnames';

import style from './UploadImage.module.scss';

import { CrossRedIcon, UploadItemImageIcon, UploadLogoImageIcon } from 'assets/icons';
import { useAppDispatch } from 'common/hooks';
import { setResponseNotice } from 'store/reducers/appSlice/slice';
import { fetchCompanyLogo } from 'store/reducers/supplier/profile/thunks';

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
  const uploadImageIcon =
    type === 'logo' ? <UploadLogoImageIcon /> : <UploadItemImageIcon />;

  const inputClasses = cn({
    [style.input_logo]: type === 'logo',
    [style.input_default]: type !== 'logo',
  });

  const imgClasses = cn({
    [style.logo_img]: type === 'logo',
    [style.default_img]: type !== 'logo',
  });

  const crossClasses = cn({
    [style.logo_cross]: type === 'logo',
    [style.default_cross]: type !== 'logo',
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

  useEffect(() => {
    if (type === 'logo') dispatch(fetchCompanyLogo());
  }, [dispatch, type]);

  return (
    <div className={cn(style.wrapper, className)} {...restProps}>
      <input
        type="file"
        className={inputClasses}
        id="profileLogo"
        onChange={handleOnChange}
      />
      <div className={style.img_wrapper}>
        {image ? (
          <div>
            <img className={imgClasses} src={image} alt={description} />

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

      {type === 'logo' && (
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
