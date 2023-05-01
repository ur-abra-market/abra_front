import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { personalSupplierInfoValidationSchema } from '../../../constants/personalSupplierInfoValidationSchema';
import { PersonalInfoChangeForm } from '../../../pages/SupplierAccountMainPage/PersonalInfoChangeForm/PersonalInfoChangeForm';
import { useAppDispatch } from '../../../store/hooks';
import { setAccountInfo } from '../../../store/reducers/formRegistrationSlice';
import FormTitle from '../../FormTitle';
import Modal from '../../new-components/Modal';
import { ModalChildPhoneCheck } from '../../new-components/Modal/ModalChildPhoneCheck/ModalChildPhoneCheck';
import { Button } from '../../ui-kit';

import style from './AccountSetupForm.module.css';

interface IAccountInfoData {
  firstName: string;
  lastName: string;
  license: string;
  country: string;
  tel: string;
  code: string;
}

export const AccountSetupForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm<IAccountInfoData>({
    resolver: yupResolver(personalSupplierInfoValidationSchema),
    mode: 'all',
  });

  const onSubmit = (data: IAccountInfoData): void => {
    dispatch(
      setAccountInfo({
        user_info: {
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.code + data.tel,
        },
        license: {
          license_number: +data.license,
        },
        country: {
          country: data.country,
        },
      }),
    );

    navigate('/business-profile', { replace: true });

    reset();
  };

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <FormTitle
          step="Step 1/3"
          title="Account Info"
          text="This information will not be published. The data will only be used to create your account"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoChangeForm register={register} errors={errors} />

          <p className={style.license_reminder}>
            Use the number of any document authorizing the sale
          </p>

          <Button
            type="submit"
            disabled={!isValid}
            onClick={() => {
              // setShowModal(true); //временно, пока подтверждение номера телефона не готово на беке, вместо открытия модального окна будет продолжение регистрации
            }}
            className={style.button}
            label="Continue"
          />
        </form>

        <Modal
          showModal={showModal}
          closeModal={setShowModal}
          classNameModal={style.modal}
        >
          <ModalChildPhoneCheck setShowModal={setShowModal} phone={watch('tel')} />
        </Modal>
      </div>
    </div>
  );
};
