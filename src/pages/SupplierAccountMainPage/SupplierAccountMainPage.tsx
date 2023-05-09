import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { Button } from '../../components/ui-kit';
import { personalSupplierInfoValidationSchema } from '../../constants/personalSupplierInfoValidationSchema';
import { IAccountInfoData } from '../../interfaces';
import { useAppSelector } from '../../store/hooks';

import BusinessProfileChangeForm from './BusinessProfileChangeForm/BusinessProfileChangeForm';
import NotificationsChangeForm from './NotificationsChangeForm/NotificationsChangeForm';
import { PersonalInfoChangeForm } from './PersonalInfoChangeForm/PersonalInfoChangeForm';
import style from './SupplierAccountMainPage.module.css';

export interface IPersonalInfoDefaultValues {
  [key: string]: string;
  firstName: string;
  lastName: string;
  tel: string;
}
export type WatchedValues = {
  firstName: string;
  lastName: string;
  tel: string;
};
const SupplierAccountMainPage = (): JSX.Element => {
  const profileInfo = useAppSelector(state => state.supplierAccount.supplierInfo);

  const personalInfoDefaultValues: IPersonalInfoDefaultValues = {
    firstName: profileInfo.first_name,
    lastName: profileInfo.last_name,
    code: profileInfo.phone_country_code,
    tel: profileInfo.phone_number,
  };
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
    control,
  } = useForm<IAccountInfoData>({
    resolver: yupResolver(personalSupplierInfoValidationSchema),
    mode: 'all',
    defaultValues: personalInfoDefaultValues,
  });

  const onSubmit = (data: IAccountInfoData): void => {
    console.log(data); // todo fix
    reset();
  };

  const watchedPersonalInfoValues: WatchedValues = watch();

  const hasChanges = Object.keys(personalInfoDefaultValues).some(
    // @ts-ignore // todo fix types
    key => personalInfoDefaultValues[key] !== watchedPersonalInfoValues[key],
  );

  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <div className={style.personal_info}>
          <h3 className={style.personal_info_title}>Personal Info</h3>

          <form onSubmit={handleSubmit(onSubmit)}>
            <PersonalInfoChangeForm
              register={register}
              errors={errors}
              control={control}
            />
            <Button
              type="submit"
              disabled={!isValid || !hasChanges}
              className={style.personal_info_submit_btn}
              label="Save"
            />
          </form>
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
