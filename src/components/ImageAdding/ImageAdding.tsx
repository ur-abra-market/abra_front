import React, { ChangeEvent, FC } from 'react';

import iconImg from '../../assets/img/icons/icon-img.png';

import style from './ImageAdding.module.css';

interface ImageAddingProps {
  label?: string;
  placeholder?: string;
  error?: string;
  imgUrl?: string;
  setImgUrl?: any;
  images?: any[];
  setImages?: any;
  register?: any;
}
const ImageAdding: FC<ImageAddingProps> = ({
  label,
  placeholder,
  error,
  register,
  imgUrl,
  setImgUrl,
  images,
  setImages,
}) => {
  const imgChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();

    reader.onload = () => {
      setImgUrl(reader?.result);
    };

    if (!e.target.files) return;

    // TODO - заглущка проверка на images
    if (e.target.files[0] && images) {
      reader.readAsDataURL(e.target.files[0]);
      setImages([...images, e.target.files[0]]);
    }
  };

  return (
    <div className={style.profileLogoWrapper}>
      <div className={style.inputContainer}>
        <input
          type="file"
          {...register}
          accept="image/*"
          name="file"
          id="profileLogo"
          className={label ? style.inputFileLabel : style.inputFile}
          onChange={imgChange}
        />

        {imgUrl ? (
          <img
            src={imgUrl}
            alt="avatar img"
            id="avatarImg"
            className={label ? style.avatarImgLabel : style.avatarImg}
          />
        ) : (
          <img
            src={iconImg}
            alt="icon img"
            id="iconImg"
            className={label ? style.iconImgLabel : style.iconImg}
          />
        )}

        {label ? (
          <div className={style.iconBackgroundLabel} />
        ) : (
          <div className={style.iconBackground} />
        )}
      </div>

      <div className={style.labelContainer}>
        <label htmlFor="profileLogo" className={style.label}>
          {label}
        </label>

        <p className={style.placeholder}>{placeholder}</p>
      </div>

      {error && <p className={style.inputError}>&#9888; {error}</p>}
    </div>
  );
};

export default ImageAdding;
