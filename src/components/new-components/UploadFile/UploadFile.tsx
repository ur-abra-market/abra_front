import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import cn from 'classnames';

import { PlusIcon } from '../../../assets/img';
import { ReactComponent as Photo } from '../../../assets/img/icons/photo_icon.svg';
import { Status } from '../../../enums/status.enum';
import userFetch from '../../../services/user.service';

import style from './UploadFile.module.css';
import { UploadFileProps } from './UploadFile.props';

const UploadFile: FC<UploadFileProps> = props => {
  const {
    className,
    action,
    image,
    variant = 'square',
    label = 'add image',
    size = 'small',
    text,
    ...restProps
  } = props;

  const [file, setFile] = useState<UploadFileData>({ preview: '', raw: '' });
  const [status, setStatus] = useState<Status>(Status.Idle);

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>): void => {
    if (e.target?.files?.length) {
      setFile({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const deleteFile = (): void => {
    setFile({
      preview: '',
      raw: '',
    });
    setStatus(Status.Idle);
  };

  useEffect(() => {
    if (file.raw) {
      userFetch
        .uploadFile({ action, file: file.raw as File })
        .then(() => {
          setStatus(Status.Success);
        })
        .catch(() => {
          setStatus(Status.Failed);
        });
    }
  }, [action, file.raw]);

  useEffect(() => {
    if (image) {
      setFile(prevState => ({ ...prevState, preview: image }));
    }
  }, [image]);

  return (
    <div className={cn(style.wrapper, className)} {...restProps}>
      <div
        className={cn(style.image, {
          [style.succes]: status === Status.Success,
          [style.error]: status === Status.Failed,
          [style.square]: variant === 'square',
          [style.circle]: variant === 'circle',
          [style.image_middle_size]: size === 'middle',
        })}
      >
        {file.preview ? (
          <>
            <img
              className={cn(style.img, {
                [style.img_round]: variant === 'circle',
                [style.img_middle_size]: size === 'middle',
              })}
              src={file.preview}
              alt=""
            />
            <button
              type="button"
              className={cn(style.delete_img_btn, {
                [style.delete_img_btn_none]: variant === 'circle',
              })}
              onClick={deleteFile}
            >
              <PlusIcon />
            </button>
          </>
        ) : (
          <label className={style.label}>
            <Photo />
            <input type="file" className={style.input} onChange={handleOnChange} />
          </label>
        )}
      </div>
      <div>
        <label className={style.label}>
          {label}
          <input type="file" className={style.input} onChange={handleOnChange} />
        </label>
        {text && <div className={style.text}>{text}</div>}
      </div>
    </div>
  );
};

export default UploadFile;

type UploadFileData = {
  preview: string;
  raw: string | File;
};
