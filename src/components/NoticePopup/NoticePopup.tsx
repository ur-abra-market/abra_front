import React, { useEffect, useState } from 'react';

import { createPortal } from 'react-dom';

import { CrossWhiteIcon } from '../../assets/icons';
import { useAppDispatch } from '../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../common/hooks/useAppSelector';
import { responseNoticeSelector } from '../../store/reducers/appSlice';
import { setResponseNotice } from '../../store/reducers/appSlice/slice';

import style from './NoticePopup.module.scss';

export const NoticePopup = (): JSX.Element => {
  const { noticeType, message } = useAppSelector(responseNoticeSelector);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

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
      <div className={style.notice_container}>
        <p className={style.message}>{message} asdasdasd</p>
        <CrossWhiteIcon className={style.cross} onClick={handleNoticePopupClose} />
      </div>
    ),
    document.querySelector('body') as HTMLElement,
  );
};
