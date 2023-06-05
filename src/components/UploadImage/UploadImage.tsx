import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  useEffect,
  useState,
} from 'react';

import cn from 'classnames';

import userService from '../../services/user/user.service';

import style from './UploadImage.module.scss';

import { UploadItemImageIcon, UploadLogoImageIcon, CrossRedIcon } from 'assets/icons';

interface IUploadFileData {
  preview: string;
  raw: string | File;
}

interface IUploadImage
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  action: string;
  image?: string;
  label?: string;
  placeholder?: string;
  type: 'default' | 'logo';
}

export const UploadImage: FC<IUploadImage> = ({
  className,
  action,
  image,
  type,
  label,
  placeholder,
  ...restProps
}) => {
  const [file, setFile] = useState<IUploadFileData>({ preview: '', raw: '' });
  const [image_id, setImage_id] = useState(0);
  const uploadImage = type === 'logo' ? <UploadLogoImageIcon /> : <UploadItemImageIcon />;
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
  const imgAction =
    type === 'logo' ? '/suppliers/deleteCompanyImage/' : '/suppliers/deleteProductImage/';
  const handleOnClick = (): void => {
    userService
      .deleteImage({
        action: imgAction,
        queries: { company_image_id: image_id },
      })
      .then(() => setFile({ preview: '', raw: '' }));
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target?.files?.length) {
      setFile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      // eslint-disable-next-line no-param-reassign
      e.target.value = '';
    }
  };

  useEffect(() => {
    if (file.raw) {
      userService
        .uploadImage({ action, file: file.raw as File })
        .then(res => setImage_id(res.result.id));
    }
  }, [file.raw, action]);

  useEffect(() => {
    if (image) {
      setFile(prevState => ({ ...prevState, preview: image }));
    }
  }, [image]);

  return (
    <div className={cn(style.wrapper, className)} {...restProps}>
      <input
        type="file"
        className={inputClasses}
        id="profileLogo"
        onChange={handleOnChange}
      />
      <div className={style.img_wrapper}>
        {file.preview ? (
          <div>
            <img className={imgClasses} src={file.preview} alt="" />

            <button className={crossClasses} onClick={handleOnClick} type="button">
              <CrossRedIcon />
            </button>
          </div>
        ) : (
          uploadImage
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
