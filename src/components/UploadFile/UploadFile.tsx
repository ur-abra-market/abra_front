import React, { ChangeEvent, FC, useEffect, useState } from 'react';

import cn from 'classnames';

import { ReactComponent as Photo } from '../../assets/img/icons/image_picker.svg';
import { LoadingStatus } from '../../common/types/enums/status.enum';
import userService from '../../services/user/user.service';

import style from './UploadFile.module.css';
import { UploadFileProps } from './UploadFile.props';

const UploadFile: FC<UploadFileProps> = props => {
  const { className, action, image, ...restProps } = props;

  const [file, setFile] = useState<UploadFileData>({ preview: '', raw: '' });
  const [status, setStatus] = useState<LoadingStatus>(LoadingStatus.Idle);

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
          setStatus(LoadingStatus.Success);
        })
        .catch(() => {
          setStatus(LoadingStatus.Failed);
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
          [style.succes]: status === LoadingStatus.Success,
          [style.error]: status === LoadingStatus.Failed,
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
