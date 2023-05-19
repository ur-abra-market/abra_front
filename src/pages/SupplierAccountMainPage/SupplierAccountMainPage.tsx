import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { ButtonLogOut } from '../../components/new-components/ButtonLogOut/ButtonLogOut';
import { Button } from '../../components/ui-kit';
import { accountPersonalInfoValidationSchema } from '../../constants/accountPersonalInfoValidationSchema';
import { IAccountPersonalInfo } from '../../interfaces';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { updateAccountPersonalInfo } from '../../store/reducers/formRegistrationSlice';
import { parsePhoneNumber } from '../../utils/parsePhoneNumber';

import BusinessProfileChangeForm from './BusinessProfileChangeForm/BusinessProfileChangeForm';
import NotificationsChangeForm from './NotificationsChangeForm/NotificationsChangeForm';
import { PersonalInfoChangeForm } from './PersonalInfoChangeForm/PersonalInfoChangeForm';
import style from './SupplierAccountMainPage.module.css';

const SupplierAccountMainPage = (): JSX.Element => {
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
          <div className={style.details_block}>
            <button type="button">Change your email</button>
            <p>(All your data including order history will be deleted)</p>
          </div>
          <div className={style.details_block}>
            <button type="button">Change your password</button>
            <p>(All your data including order history will be deleted)</p>
          </div>
          <div className={style.details_block}>
            <button type="button">Remove the account?</button>
            <p>(All your data including order history will be deleted)</p>
          </div>
        </div>
        <div className={style.notifications}>
          <NotificationsChangeForm />
        </div>
      </div>
    </div>
  );
};

export default SupplierAccountMainPage;
