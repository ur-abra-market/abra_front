import React, { ChangeEvent, FC, useRef, useState } from 'react';

import cn from 'classnames';

import deleteImg from '../../../assets/img/icons/delete_Img_red.svg';
import iconImg from '../../../assets/img/icons/photo_icon.svg';

import style from './AddingImageSpot.module.css';
import { AddingImageSpotProps } from './AddingImageSpot.props';

const AddingImageSpot: FC<AddingImageSpotProps> = (props): JSX.Element => {
  const {
    classes,
    error,
    register,
    images,
    logo,
    setImages,
    label,
    placeholder,
    className,
    ...restProps
  } = props;
  // TODO поправить str 54
  const [imgUrl, setImgUrl] = useState<string | ArrayBuffer | null>(logo || '');

  const photoPicker = useRef<HTMLInputElement | null>(null);

  const handlePickPhoto = (): void => {
    if (photoPicker.current !== null) {
      photoPicker.current.click();
    }
  };

  const imgChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const reader = new FileReader();

    reader.onload = () => {
      setImgUrl(reader?.result);
    };
    if (e.target.files !== null && e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
      setImages([...images, e.target.files[0]]);
    }
  };

  const onClose = (): void => {
    // e.preventDefault();
    setImgUrl(imgUrl);
    setImages(images.splice(images.length - 1));
  };

  return (
    <div
      className={cn(
        {
          [style.wrapperWithLabel]: !!label,
          [style.wrapper]: !label,
        },
        className,
      )}
      {...restProps}
    >
      <input
        type="file"
        {...register}
        accept="image/*"
        name="file"
        ref={photoPicker}
        className={style.hidden}
        onChange={imgChange}
      />

      {imgUrl ? (
        <div className={style.photo}>
          <img
            src={imgUrl as string}
            alt="img"
            id="photoImg"
            className={classes.uploadedImage}
          />
          <button type="button" className={style.photoRemove} onClick={onClose}>
            <img src={deleteImg} alt="close" />
          </button>
        </div>
      ) : (
        <div role="presentation" className={classes.background} onClick={handlePickPhoto}>
          <img
            src={iconImg}
            alt="icon img"
            id="iconImg"
            className={classes.sampleImage}
          />
        </div>
      )}

      {label && (
        <div className={style.labelContainer}>
          <label
            role="presentation"
            htmlFor="profileLogo"
            onClick={handlePickPhoto}
            className={classes ? classes.label : style.label}
          >
            {label}
          </label>

          <p className={style.placeholder}>{placeholder}</p>
        </div>
      )}
      {error && <p className={style.inputError}>&#9888; {error}</p>}
    </div>
  );
};

export default AddingImageSpot;
