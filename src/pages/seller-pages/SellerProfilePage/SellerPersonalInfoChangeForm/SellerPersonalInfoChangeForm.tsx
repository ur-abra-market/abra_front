import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import style from './SellerPersonalInfoChangeForm.module.scss';

import { personalInfoFormValidationSchema } from 'common/constants';
import { useAppDispatch, useAppSelector } from 'common/hooks';
import { useSetPersonalInfoValues } from 'common/hooks/useSetPersonalInfoValues';
import { IPersonalInfoFormData, LoadingStatusEnum } from 'common/types';
import { parsePhoneNumber } from 'common/utils/parsePhoneNumber';
import { UploadImage } from 'elements';
import { ButtonLogOut } from 'elements/ButtonLogOut/ButtonLogOut';
import { PersonalInfoChangeForm } from 'modules';
import { countriesSelector } from 'store/reducers/commonSlice';
import {
  sellerAvatarSelector,
  sellerLoadingSelector,
  updateSellerAvatar,
} from 'store/reducers/seller/profile';
import {
  updatePersonalInfo,
  userLoadingSelector,
  userPersonalInfoSelector,
} from 'store/reducers/userSlice';
import { Button } from 'ui-kit';

export const SellerPersonalInfoChangeForm = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const userPersonalInfo = useAppSelector(userPersonalInfoSelector);
  const userAvatar = useAppSelector(sellerAvatarSelector);
  const isAvatarLoading =
    useAppSelector(sellerLoadingSelector).avatarLoading === LoadingStatusEnum.Loading;
  const isPersonalInfoLoading =
    useAppSelector(userLoadingSelector).personalInfoLoading === LoadingStatusEnum.Loading;

  const { countryShort, phoneNumber, lastName, firstName } = userPersonalInfo;

  const formMethods = useForm<IPersonalInfoFormData>({
    resolver: yupResolver(personalInfoFormValidationSchema),
    mode: 'all',
  });

  const {
    watch,
    handleSubmit,
    formState: { isValid },
    setValue,
  } = formMethods;

  const countries = useAppSelector(countriesSelector);

  const numberCountry = countries.find(c => c.country_short === countryShort);

  useSetPersonalInfoValues(setValue, userPersonalInfo, numberCountry);

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

  const handleUploadImage = (image: File): void => {
    dispatch(updateSellerAvatar(image));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <h3 className={style.title}>Personal Info</h3>
        <ButtonLogOut />
      </div>

      <UploadImage
        image={userAvatar}
        uploadImage={handleUploadImage}
        label="Add image"
        type="avatar"
        description="avatar"
        isDisabled={isAvatarLoading}
      />

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <PersonalInfoChangeForm countryShort={countryShort} />

          <Button
            type="submit"
            disabled={!isValid || isPersonalInfoFormDisable || isPersonalInfoLoading}
            className={style.submit_button}
            label="Save"
          />
        </form>
      </FormProvider>
    </div>
  );
};
