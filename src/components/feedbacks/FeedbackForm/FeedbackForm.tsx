import React, { FC } from 'react';

import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { toggleInfoForm } from '../../../store/reducers/appSlice/slice';
// import { Button } from '../../../ui-kit';
// import Modal from '../../Modal';
// import Social from '../Social';
// import WhatsApp from '../WhatsApp';
//
// import style from './FeedbackForm.module.css';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FeedbackForm: FC<Props> = ({ isFeedbackOpen }) => {
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onToggleInfoForm = (): void => {
    dispatch(toggleInfoForm());
  };

  return (
    <div>
      {/* <Modal showModal={isFeedbackOpen} classNameModal={style.modal}> */}
      {/*  <Button color="white" className={style.btn} onClick={onToggleInfoForm}> */}
      {/*    ✕ */}
      {/*  </Button> */}
      {/*  <WhatsApp className={style.whatsapp} /> */}
      {/*  <Social /> */}
      {/* </Modal> */}
    </div>
  );
};

export default FeedbackForm;

type Props = {
  isFeedbackOpen: boolean;
};
