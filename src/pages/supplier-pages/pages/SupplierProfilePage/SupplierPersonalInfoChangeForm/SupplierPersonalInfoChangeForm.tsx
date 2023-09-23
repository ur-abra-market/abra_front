import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import style from './SupplierPersonalInfoChangeForm.module.scss';

import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useSetPersonalInfoValues } from 'common/hooks/useSetPersonalInfoValues';
import { IPersonalInfoFormData, LoadingStatusEnum } from 'common/types';
import { parsePhoneNumber } from 'common/utils';
import { personalInfoFormValidationSchema } from 'common/utils/validation-schemas/personalInfoFormValidationSchema';
import { PersonalInfoChangeForm } from 'modules';
import { PersonalInfoHeader } from 'modules/PersonalInfoHeader/PersonalInfoHeader';
import { countriesSelector } from 'store/reducers/commonSlice';
import {
  updatePersonalInfo,
  userLoadingSelector,
  userPersonalInfoSelector,
} from 'store/reducers/userSlice';
import { Button } from 'ui-kit';

export const SupplierPersonalInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isLoading =
    useAppSelector(userLoadingSelector).personalInfoLoading === LoadingStatusEnum.Loading;

  const data = useAppSelector(userPersonalInfoSelector);

  const { lastName, firstName, countryShort, phoneNumber } = data;

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
  });

  const { watch, handleSubmit, formState, setValue } = formMethods;

  const countries = useAppSelector(countriesSelector);

  const numberCountry = countries.find(c => c.country_short === countryShort);

  useSetPersonalInfoValues(setValue, data, numberCountry);

  const [phoneNumberValue, lastNameValue, firstNameValue, countryShortValue] = watch([
    'phoneNumber',
    'lastName',
    'firstName',
    'countryShort',
  ]);

  const serverPhoneNumber = `${numberCountry?.country_code}${phoneNumber}`;

  const { numberFull: currentPhoneNumber } = parsePhoneNumber(phoneNumberValue || '');

  const isPersonalInfoFormDisable =
    currentPhoneNumber === serverPhoneNumber &&
    lastNameValue === lastName &&
    firstNameValue === firstName &&
    countryShortValue === countryShort;

  const onSubmit = async (data: IPersonalInfoFormData): Promise<void> => {
    let phoneNumberBody;

    if (currentPhoneNumber !== serverPhoneNumber) {
      const { numberBody } = parsePhoneNumber(data.phoneNumber);

      phoneNumberBody = numberBody;
    }

    const updatePersonalInfoData = {
      first_name: data.firstName,
      last_name: data.lastName,
      phone_number: phoneNumberBody || phoneNumber,
      country_id: data.countryId,
    };

    dispatch(updatePersonalInfo(updatePersonalInfoData));
  };

  return (
    <div className={style.wrapper}>
      <PersonalInfoHeader />

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoChangeForm countryShort={countryShort} />

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
