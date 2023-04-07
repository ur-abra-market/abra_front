import React from 'react';

import { useAppDispatch } from '../../../../store/hooks';
import { toggleInfoForm } from '../../../../store/reducers/app';
import { Button } from '../../../ui-kit';
import Modal from '../../Modal';
import Social from '../Social';
import WhatsApp from '../WhatsApp';

import style from './FeedbackForm.module.css';

const FeedbackForm: React.FC<Props> = ({ isFeedbackOpen }) => {
  const dispatch = useAppDispatch();

  const onToggleInfoForm = (): void => {
    dispatch(toggleInfoForm());
  };

  return (
    <div>
      <Modal active={isFeedbackOpen} classNameModal={style.modal}>
        <Button color="white" className={style.btn} onClick={onToggleInfoForm}>
          ✕
        </Button>
        <WhatsApp className={style.whatsapp} />
        <Social />
      </Modal>
    </div>
  );
};

export default FeedbackForm;

type Props = {
  isFeedbackOpen: boolean;
};
