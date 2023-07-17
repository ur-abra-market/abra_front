import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import style from './SupplierPersonalInfoChangeForm.module.scss';

import { personalInfoFormValidationSchema } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useSetPersonalInfoValues } from 'common/hooks/useSetPersonalInfoValues';
import { LoadingStatusEnum } from 'common/types';
import { ButtonLogOut } from 'elements/ButtonLogOut/ButtonLogOut';
import { PersonalInfoChangeForm } from 'modules';
import {
  IUserPersonalInfo,
  updatePersonalInfo,
  userLoadingSelector,
  userPersonalInfoSelector,
} from 'store/reducers/userSlice';
import { Button } from 'ui-kit';

export const SupplierPersonalInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector(userLoadingSelector) === LoadingStatusEnum.Loading;
  const data = useAppSelector(userPersonalInfoSelector);
  const { lastName, firstName, phoneNumberCountryId, phoneNumberBody } = data;

  const formMethods = useForm<IUserPersonalInfo>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
  });
  const { watch, handleSubmit, formState, setValue } = formMethods;

  useSetPersonalInfoValues(setValue, data);

  const [lastNameValue, firstNameValue, phoneNumberCountryIdValue, phoneNumberBodyValue] =
    watch(['lastName', 'firstName', 'phoneNumberBody', 'phoneNumberCountryId']);

  const isPersonalInfoFormDisable =
    lastNameValue === lastName &&
    firstNameValue === firstName &&
    // @ts-ignore
    phoneNumberCountryIdValue === phoneNumberCountryId &&
    // @ts-ignore
    phoneNumberBodyValue === phoneNumberBody;
  const onSubmit = async (data: IUserPersonalInfo): Promise<void> => {
    const updatePersonalInfoData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: data.phoneNumberBody,
      country_id: data.phoneNumberCountryId,
    };

    dispatch(updatePersonalInfo(updatePersonalInfoData));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>Personal Info</h3>
        <ButtonLogOut />
      </div>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoChangeForm />

          <Button
            type="submit"
            disabled={isLoading || !formState.isValid || isPersonalInfoFormDisable}
            className={style.submit_button}
            label="Save"
          />
        </form>
      </FormProvider>
    </div>
  );
};
