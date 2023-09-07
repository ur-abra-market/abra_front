import React, { useEffect, useState } from 'react';

import cn from 'classnames';
import { createPortal } from 'react-dom';

import style from './NoticePopup.module.scss';

import { CrossWhiteIcon } from 'assets/icons';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { responseNoticeSelector } from 'store/reducers/appSlice';
import { setResponseNotice } from 'store/reducers/appSlice/slice';

export const NoticePopup = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const { noticeType, message } = useAppSelector(responseNoticeSelector);
  const [open, setOpen] = useState(false);

  const noticeContainerClasses = cn(style.notice_container, {
    [style.error]: noticeType === 'error',
    [style.success]: noticeType === 'success',
  });

  const handleNoticePopupClose = (): void => {
    setOpen(false);
    dispatch(setResponseNotice({ message: null, noticeType: null }));
  };

  useEffect(() => {
    let timer: any;

    if (message) {
      setOpen(true);

      timer = setTimeout(() => {
        handleNoticePopupClose();
      }, 10000);
    }

    return () => clearTimeout(timer);
  }, [message]);

  return createPortal(
    open && (
      <div className={noticeContainerClasses}>
        <p className={style.message}>{message}</p>
        <CrossWhiteIcon className={style.cross} onClick={handleNoticePopupClose} />
      </div>
    ),
    document.querySelector('body') as HTMLElement,
  );
};
