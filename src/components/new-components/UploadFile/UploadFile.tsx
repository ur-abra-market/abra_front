import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import cn from 'classnames';

import { ReactComponent as Photo } from '../../../assets/img/icons/photo_icon.svg';
import { Status } from '../../../enums/status.enum';
import userService from '../../../services/user.service';

import style from './UploadFile.module.css';
import { UploadFileProps } from './UploadFile.props';

const UploadFile: FC<UploadFileProps> = props => {
  const { className, action, image, ...restProps } = props;

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

  useEffect(() => {
    if (file.raw) {
      userService
        .uploadFile({ action, file: file.raw as File })
        .then(() => {
          setStatus(Status.Success);
        })
        .catch(() => {
          setStatus(Status.Failed);
        });
    }
  }, [file.raw]);

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
        })}
      >
        {file.preview ? (
          <img className={style.img} src={file.preview} alt="" />
        ) : (
          <Photo />
        )}
      </div>
      <label className={style.label}>
        add image
        <input type="file" className={style.input} onChange={handleOnChange} />
      </label>
    </div>
  );
};

export default UploadFile;

type UploadFileData = {
  preview: string;
  raw: string | File;
};
