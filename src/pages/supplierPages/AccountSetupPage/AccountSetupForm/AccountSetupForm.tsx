import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { accountPersonalInfoValidationSchema } from '../../../../common/constants/accountPersonalInfoValidationSchema';
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';
import { IAccountPersonalInfo } from '../../../../common/types/interfaces';
import { parsePhoneNumber } from '../../../../common/utils/parsePhoneNumber';
import Modal from '../../../../components/Modal';
import { ModalChildPhoneCheck } from '../../../../components/Modal/ModalChildPhoneCheck/ModalChildPhoneCheck';
import { sendAccountPersonalInfo } from '../../../../store/reducers/authSlice';
import { Button, SupplierRegisterFormStep } from '../../../../ui-kit';
import { PersonalInfoChangeForm } from '../../SupplierAccountMainPage';

import style from './AccountSetupForm.module.scss';

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
    const { countryCode, numberBody } = parsePhoneNumber(data.phoneNumber);

    try {
      const response = (await dispatch(
        sendAccountPersonalInfo({
          first_name: data.firstName,
          last_name: data.lastName,
          phone_country_code: countryCode,
          phone_number: numberBody,
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
        <SupplierRegisterFormStep step={1} />

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
