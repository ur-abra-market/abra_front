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
  const [file, setFile] = useState<UploadFileData>({ preview: '', raw: '' });
  const [image_id, setImage_id] = useState(0);
  const uploadImage = type === 'logo' ? <UploadLogoImageIcon /> : <UploadItemImageIcon />;
  const inputStyle = type === 'logo' ? `${style.input_logo}` : `${style.input_default}`;
  const imgStyle = type === 'logo' ? `${style.logo_img}` : `${style.default_img}`;
  const crossStyle = type === 'logo' ? `${style.logo_cross}` : `${style.default_cross}`;
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
        className={inputStyle}
        id="profileLogo"
        onChange={handleOnChange}
      />
      <div className={style.img_wrapper}>
        {file.preview ? (
          <div>
            <img className={imgStyle} src={file.preview} alt="" />

            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className={crossStyle} onClick={handleOnClick}>
              <CrossRedIcon />
            </div>
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

type UploadFileData = {
  preview: string;
  raw: string | File;
};
