import { ChangeEvent, FC } from 'react';

import style from './ImageAdding.module.css';

import { CrossRedIcon, ImagePickerIcon } from 'assets/icons';

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
}): JSX.Element => {
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
    <div className={style.profile_logo_wrapper}>
      <div className={style.input_container}>
        <input
          type="file"
          {...register}
          accept="image/*"
          name="file"
          id="profileLogo"
          className={label ? style.input_file_label : style.input_file}
          onChange={imgChange}
        />

        {imgUrl ? (
          <>
            <img
              src={imgUrl}
              alt="avatar img"
              id="avatarImg"
              className={label ? style.avatar_img_label : style.avatar_img}
            />
            <button
              type="button"
              className={style.btn_plus}
              onClick={() => setImgUrl('')}
            >
              <CrossRedIcon />
            </button>
          </>
        ) : (
          <ImagePickerIcon className={label ? style.icon_img_label : style.icon_img} />
        )}

        {label ? (
          <div className={style.icon_background_label} />
        ) : (
          <div className={style.icon_background} />
        )}
      </div>

      <div className={style.label_container}>
        <label htmlFor="profileLogo" className={style.label}>
          {label}
        </label>

        <p className={style.placeholder}>{placeholder}</p>
      </div>

      {error && <p className={style.input_error}>&#9888; {error}</p>}
    </div>
  );
};

export default ImageAdding;
