import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { accountPersonalInfoValidationSchema } from '../../../constants/accountPersonalInfoValidationSchema';
import { IAccountPersonalInfo } from '../../../interfaces';
import { PersonalInfoChangeForm } from '../../../pages/SupplierAccountMainPage/PersonalInfoChangeForm/PersonalInfoChangeForm';
import { useAppDispatch } from '../../../store/hooks';
import { sendAccountPersonalInfo } from '../../../store/reducers/formRegistrationSlice';
import { parsePhoneNumber } from '../../../utils/parsePhoneNumber';
import FormTitle from '../../FormTitle';
import Modal from '../../new-components/Modal';
import { ModalChildPhoneCheck } from '../../new-components/Modal/ModalChildPhoneCheck/ModalChildPhoneCheck';
import { Button } from '../../ui-kit';

import style from './AccountSetupForm.module.css';

export const AccountSetupForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const formMethods = useForm<IAccountPersonalInfo>({
    resolver: yupResolver(accountPersonalInfoValidationSchema),
    mode: 'all',
  });
  const {
    reset,
    handleSubmit,
    formState: { isValid },
    watch,
  } = formMethods;

  const onSubmit = async (data: IAccountPersonalInfo): Promise<void> => {
    const { countryCode, phoneNumberBody } = parsePhoneNumber(data.phoneNumber);

    try {
      const response = (await dispatch(
        sendAccountPersonalInfo({
          first_name: data.firstName,
          last_name: data.lastName,
          phone_country_code: countryCode,
          phone_number: phoneNumberBody,
        }),
      )) as { payload: { result: boolean } };

      if (response.payload.result) {
        navigate('/business-profile');
        reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <FormTitle
          step="Step 1/3"
          title="Account Info"
          text="This information will not be published. The data will only be used to create your account"
        />

        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            <PersonalInfoChangeForm phoneInputClass={style.phone_input} />

            <Button
              type="submit"
              disabled={!isValid}
              onClick={() => {
                // setShowModal(true); //временно, пока подтверждение номера телефона не готово на беке, вместо открытия модального окна будет продолжение регистрации
              }}
              className={style.submit_btn}
              label="Continue"
            />
          </form>
        </FormProvider>

        <Modal
          showModal={showModal}
          closeModal={setShowModal}
          classNameModal={style.modal}
        >
          <ModalChildPhoneCheck
            setShowModal={setShowModal}
            phone={watch('phoneNumber')}
          />
        </Modal>
      </div>
    </div>
  );
};
