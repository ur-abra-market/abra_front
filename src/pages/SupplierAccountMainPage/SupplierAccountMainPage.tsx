import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';

import Notifications from '../../components/new-components/Notifications';
import { INotificationsItem } from '../../components/new-components/Notifications/Notifications';
import { Button } from '../../components/ui-kit';
import { personalSupplierInfoValidationSchema } from '../../constants/personalSupplierInfoValidationSchema';
import { IAccountInfoData } from '../../interfaces';
import { useAppSelector } from '../../store/hooks';

import BusinessProfileChangeForm from './BusinessProfileChangeForm/BusinessProfileChangeForm';
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
  const notifications = useAppSelector(state => state.login.notifications);

  const personalInfoDefaultValues: IPersonalInfoDefaultValues = {
    firstName: profileInfo.first_name,
    lastName: profileInfo.last_name,
    code: profileInfo.phone_country_code,
    tel: profileInfo.phone_number,
  };

  const formMethods = useForm<IAccountInfoData>({
    resolver: yupResolver(personalSupplierInfoValidationSchema),
    mode: 'all',
    defaultValues: personalInfoDefaultValues,
  });
  const { watch, reset, handleSubmit, formState } = formMethods;

  const onSubmit = (data: IAccountInfoData): void => {
    console.log(data); // todo fix
    reset();
  };

  const watchedPersonalInfoValues: WatchedValues = watch();

  const hasChanges = Object.keys(personalInfoDefaultValues).some(
    // @ts-ignore // todo fix types
    key => personalInfoDefaultValues[key] !== watchedPersonalInfoValues[key],
  );

  const notificationsKeys = Object.keys(notifications ?? []);

  const NOTIFICATIONS_DATA: INotificationsItem[] = [
    {
      id: notificationsKeys[1],
      value: notifications ? notifications.on_advertising_campaigns : false,
      label: 'Advertising campaigns',
    },
    {
      id: notificationsKeys[2],
      value: notifications ? notifications.on_order_updates : false,
      label: 'Order updates',
    },
    {
      id: notificationsKeys[3],
      value: notifications ? notifications.on_order_reminders : false,
      label: 'Order reminders',
    },
    {
      id: notificationsKeys[4],
      value: notifications ? notifications.on_product_updates : false,
      label: 'Product updates',
    },
    {
      id: notificationsKeys[5],
      value: notifications ? notifications.on_product_reminders : false,
      label: 'Product reminders',
    },
    {
      id: notificationsKeys[6],
      value: notifications ? notifications.on_reviews_of_products : false,
      label: 'Reviews of products',
    },
    {
      id: notificationsKeys[7],
      value: notifications ? notifications.on_change_in_demand : false,
      label: 'Change in demand',
    },
    {
      id: notificationsKeys[8],
      value: notifications ? notifications.on_advice_from_abra : false,
      label: 'Advice from Abra',
    },
    {
      id: notificationsKeys[9],
      value: notifications ? notifications.on_account_support : false,
      label: 'Account support',
    },
  ];

  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <div className={style.personal_info}>
          <h3 className={style.personal_info_title}>Personal Info</h3>

          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <PersonalInfoChangeForm />
              <Button
                type="submit"
                disabled={!formState.isValid || !hasChanges}
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
          <Notifications notificationsData={NOTIFICATIONS_DATA} />
        </div>
      </div>
    </div>
  );
};

export default SupplierAccountMainPage;
