import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { personalInfoFormValidationSchema } from '../../../../../../common/constants';
import { useAppDispatch } from '../../../../../../common/hooks';
import {
  IPersonalInfoRequestData,
  IPersonalInfoFormData,
} from '../../../../../../common/types';
import { parsePhoneNumber } from '../../../../../../common/utils/parsePhoneNumber';
import Modal from '../../../../../../components/Modal';
import { ModalChildPhoneCheck } from '../../../../../../components/Modal/ModalChildPhoneCheck/ModalChildPhoneCheck';
import { PersonalInfoChangeForm } from '../../../../../../modules';
import { createAccountPersonalInfo } from '../../../../../../store/reducers/authSlice/thunks';
import { Button, SupplierRegisterFormStep } from '../../../../../../ui-kit';

import style from './SupplierPersonalInfoForm.module.scss';

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

  const onSubmit = async (data: IPersonalInfoFormData): Promise<void> => {
    const { countryCode, numberBody } = parsePhoneNumber(data.phoneNumber);

    const personalInfoData: IPersonalInfoRequestData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_country_code: countryCode,
      phone_number: numberBody,
    };

    const actionResult = await dispatch(createAccountPersonalInfo(personalInfoData));

    if (createAccountPersonalInfo.fulfilled.match(actionResult)) {
      navigate('/business-profile');
    }
  };

  return (
    <div className={style.form_wrapper}>
      <div className={style.form_container}>
        <SupplierRegisterFormStep step={1} />

        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
            {/* todo fix countryShort={'ru'} key={'key'} */}
            <PersonalInfoChangeForm
              phoneInputClass={style.phone_input}
              countryShort="ru"
              key="key"
            />

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
