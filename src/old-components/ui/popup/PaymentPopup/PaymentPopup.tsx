import { FC } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';

import Check from '../../../Check';

import style from './PaymentPopup.module.css';

import { CrossRedIcon } from 'assets/icons'; // 16px
import { Button, Input } from 'ui-kit';

interface FormCardType {
  card_number: number;
  full_name: string;
  date: number;
  cvv: number;
}
interface PaymentPopupType {
  modal: boolean;
  setModal: (modal: boolean) => void;
}
const schema = yup
  .object({
    card_number: yup.number().required('Card number is required'),
    full_name: yup.string().required('Card Holder is required'),
    date: yup.number().required('Expiration date is required'),
    cvv: yup.number().required('CVV/CSC is required'),
  })
  .required();

const PaymentPopup: FC<PaymentPopupType> = ({ modal, setModal }): JSX.Element => {
  const styles = {
    scale: modal ? '1' : '0',
    zIndex: modal ? '20' : '0',
  };
  const {
    register,
    handleSubmit,
    formState: { isValid, errors },
  } = useForm<FormCardType>({
    resolver: yupResolver(schema),
    mode: 'all',
  });

  const onSubmit: SubmitHandler<FormCardType> = (): void => {
    if (!isValid) return;
    setModal(false);
  };

  const onClickModalHandler = (): void => {
    setModal(false);
  };

  return (
    <div className={style.payment_popup} style={styles}>
      <div className={style.payment_popup_modal}>
        <div className={style.payment_popup_row1}>
          <h4 className={style.payment_popup_title_text}>Add Payment Card</h4>
          <Check label="Save the address for next orders" />
          <CrossRedIcon
            className={style.payment_popup_modal_exit}
            onClick={onClickModalHandler}
          />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={style.payment_popup_block}>
          <div className={style.payment_popup_block_title}>Card Info</div>
          <div className={style.text_modal}>
            <div className={style.text_modal_title}>Card number</div>
            <Input
              {...register('card_number')}
              classNameWrapper={style.text_modal_input}
              placeholder="Enter a card number"
              error={errors.card_number?.message}
            />
          </div>
          <div className={style.text_modal}>
            <div className={style.text_modal_title}>Card Holder</div>
            <Input
              {...register('full_name')}
              classNameWrapper={style.text_modal_input}
              placeholder="Enter the first and last name"
              error={errors.full_name?.message}
            />
          </div>
          <div className={style.payment_popup_block_row2}>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>Expiration date</div>
              <Input
                {...register('date')}
                classNameWrapper={style.text_modal_input}
                placeholder="MM/YY"
                error={errors.date?.message}
              />
            </div>
            <div className={style.text_modal}>
              <div className={style.text_modal_title}>CVV/CSC</div>
              <Input
                {...register('cvv')}
                classNameWrapper={style.text_modal_input}
                placeholder="Enter a 3-4 digits code"
                error={errors.cvv?.message}
              />
            </div>
          </div>
          <Button
            label="Confirm"
            className={style.payment_popup_button}
            type="submit"
            disabled={!isValid}
          />
        </form>
      </div>
    </div>
  );
};

export default PaymentPopup;
