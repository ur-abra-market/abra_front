import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { accountPersonalInfoValidationSchema } from '../../../common/constants/accountPersonalInfoValidationSchema';
import { useAppDispatch } from '../../../common/hooks/useAppDispatch';
import { useAppSelector } from '../../../common/hooks/useAppSelector';
import { IAccountPersonalInfo } from '../../../common/types/interfaces';
import { parsePhoneNumber } from '../../../common/utils/parsePhoneNumber';
import { AccountManagementLink } from '../../../components';
import { ButtonLogOut } from '../../../components/ButtonLogOut/ButtonLogOut';
import { updateAccountPersonalInfo } from '../../../store/reducers/formRegistrationSlice';
import { Button } from '../../../ui-kit';

import style from './SupplierAccountMainPage.module.css';

import {
  BusinessProfileChangeForm,
  NotificationsChangeForm,
  PersonalInfoChangeForm,
} from './index';

export const SupplierAccountMainPage = (): JSX.Element => {
  const { lastName, firstName, phoneCountryCode, phoneNumberBody } = useAppSelector(
    state => state.supplierAccount.supplierInfo,
  );
  const phoneNumber = `${phoneCountryCode}${phoneNumberBody}`;
  const dispatch = useAppDispatch();

  const formMethods = useForm<IAccountPersonalInfo>({
    resolver: yupResolver(accountPersonalInfoValidationSchema),
    mode: 'all',
    defaultValues: {
      firstName,
      lastName,
      phoneNumber,
    },
  });
  const { watch, handleSubmit, formState } = formMethods;

  const [phoneNumberValue, lastNameValue, firstNameValue] = watch([
    'phoneNumber',
    'lastName',
    'firstName',
  ]);

  const { numberFull } = parsePhoneNumber(phoneNumberValue);

  const isPersonalInfoFormDisable =
    phoneNumber === numberFull &&
    lastNameValue === lastName &&
    firstName === firstNameValue;

  const onSubmit = async (data: IAccountPersonalInfo): Promise<void> => {
    const { countryCode, numberBody } = parsePhoneNumber(data.phoneNumber);

    try {
      await dispatch(
        updateAccountPersonalInfo({
          first_name: data.firstName,
          last_name: data.lastName,
          phone_country_code: phoneNumber === numberFull ? phoneCountryCode : countryCode,
          phone_number: phoneNumber === numberFull ? phoneNumberBody : numberBody,
        }),
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <div className={style.personal_info}>
          <div className={style.personal_info_title_logout_container}>
            <h3 className={style.personal_info_title}>Personal Info</h3>
            <ButtonLogOut />
          </div>

          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <PersonalInfoChangeForm />

              <Button
                type="submit"
                disabled={!formState.isValid || isPersonalInfoFormDisable}
                className={style.personal_info_submit_btn}
                label="Save"
              />
            </form>
          </FormProvider>
        </div>

        <div className={style.business_profile}>
          <BusinessProfileChangeForm />
        </div>
        <div className={style.account_details}>
          <AccountManagementLink
            linkLabel="Change your email"
            path="/changeEmail"
            description="(You will have to confirm a new email)"
          />
          <AccountManagementLink
            linkLabel=" Change your password"
            path="/changePassword"
            description="(In case if you forgot a current password or need a stronger one)"
          />
          <AccountManagementLink
            linkLabel=" Remove the account?"
            path="/" // todo fix
            description="(All your data including order history will be deleted)"
          />
        </div>
        <div className={style.notifications}>
          <NotificationsChangeForm />
        </div>
      </div>
    </div>
  );
};
