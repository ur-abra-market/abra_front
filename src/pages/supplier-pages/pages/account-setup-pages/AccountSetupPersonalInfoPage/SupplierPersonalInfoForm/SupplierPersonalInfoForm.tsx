import React, { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import style from './SupplierPersonalInfoForm.module.scss';

import { personalInfoFormValidationSchema } from 'common/constants';
import { useAppDispatch } from 'common/hooks';
import { IPersonalInfoFormData } from 'common/types';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
import Modal from 'elements/Modal';
import { ModalChildPhoneCheck } from 'elements/Modal/ModalChildPhoneCheck/ModalChildPhoneCheck';
import { PersonalInfoChangeForm } from 'modules';
import { SupplierRegisterFormStep } from 'pages/supplier-pages/supplier-pages-common';
import { ACCOUNT_SETUP_BUSINESS_INFO } from 'routes';
import { IPersonalInfoRequest } from 'services/auth/auth.serviceTypes';
import { createAccountPersonalInfo } from 'store/reducers/authSlice';
import { getCountries } from 'store/reducers/commonSlice';
import { Button } from 'ui-kit';

export const SupplierPersonalInfoForm = (): JSX.Element => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
  });
  const {
    handleSubmit,
    formState: { isValid },
    watch,
  } = formMethods;

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  const onSubmit = async (data: IPersonalInfoFormData): Promise<void> => {
    const { numberBody } = parsePhoneNumber(data.phoneNumber);

    const personalInfoData: IPersonalInfoRequest = {
      first_name: data.firstName,
      last_name: data.lastName,
      country_id: data.countryId,
      phone_number: numberBody,
    };

    const actionResult = await dispatch(createAccountPersonalInfo(personalInfoData));

    if (actionResult.payload.result) {
      navigate(ACCOUNT_SETUP_BUSINESS_INFO);
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
                // setShowModal(true); -> while phone number confirmation is not ready on the backend, instead of opening a modal window, the registration process will continue.
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
