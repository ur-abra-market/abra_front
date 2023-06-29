import React, { useCallback, useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import style from './SellerPersonalInfoChangeForm.module.scss';

import { personalInfoFormValidationSchema } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useSetPersonalInfoValues } from 'common/hooks/useSetPersonalInfoValues';
import { IPersonalInfoFormData } from 'common/types';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
import { UploadImage } from 'elements';
import { ButtonLogOut } from 'elements/ButtonLogOut/ButtonLogOut';
import { PersonalInfoChangeForm } from 'modules';
import { countriesSelector } from 'store/reducers/commonSlice';
import { sellerPersonalInfoSelector } from 'store/reducers/seller/profile';
import { getSellerAvatar } from 'store/reducers/seller/profile/thunks';
import { getPersonalInfo, updatePersonalInfo } from 'store/reducers/userSlice';
import { Button } from 'ui-kit';

export const SellerPersonalInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const data = useAppSelector(sellerPersonalInfoSelector);

  const { countryShort, phoneNumber, lastName, firstName, avatar } = data;

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
  });

  const { watch, handleSubmit, formState, setValue } = formMethods;

  const countries = useAppSelector(countriesSelector);

  const numberCountry = countries.find(c => c.country_short === countryShort);

  useSetPersonalInfoValues(setValue, data, numberCountry);

  useEffect(() => {
    dispatch(getPersonalInfo());
    dispatch(getSellerAvatar());
  }, [dispatch]);

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

  const handleUploadImage = useCallback((image: File): void => {}, []); // пока нету санки

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>Personal Info</h3>
        <ButtonLogOut />
      </div>

      <UploadImage
        uploadImage={handleUploadImage}
        label="Add image"
        type="avatar"
        image={avatar || ''}
        description="avatar"
      />

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoChangeForm countryShort={countryShort} />

          <Button
            type="submit"
            disabled={!formState.isValid || isPersonalInfoFormDisable}
            className={style.submit_button}
            label="Save"
          />
        </form>
      </FormProvider>
    </div>
  );
};
