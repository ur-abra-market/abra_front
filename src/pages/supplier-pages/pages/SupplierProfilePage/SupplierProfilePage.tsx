import { useEffect } from 'react';

import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { useAppDispatch } from '../../../../common/hooks';
import { AccountManagement } from '../../../../components';
import { getCountries } from '../../../../store/reducers/commonSlice';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../supplier-pages-common';

import style from './SupplierProfilePage.module.css';

import { NotificationsChangeForm, SupplierPersonalInfoChangeForm } from './index';

export const SupplierProfilePage = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const formMethods = useForm<ISupplierBusinessInfoFormValues>({
    resolver: yupResolver(supplierBusinessInfoFormValidationSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      code: '',
      aboutBusiness: '',
      tel: '',
      yearEstablished: null,
      address: '',
      checkbox: false,
      numEmployees: '',
      storeName: '',
      businessSector: null,
      entrepreneurNumber: '',
    },
  });

  useEffect(() => {
    dispatch(getCountries());
  }, []);

  return (
    <div className={style.supplier_cabinet}>
      <div className={style.supplier_cabinet_content_wrapper}>
        <SupplierPersonalInfoChangeForm />

        <div className={style.business_profile}>
          <FormProvider {...formMethods}>
            <SupplierBusinessInfoForm
              updateForm
              title="Main info"
              onSubmit={(data: any) => console.log(data)}
            />
          </FormProvider>
        </div>

        <div className={style.account_details}>
          <AccountManagement />
        </div>

        <div className={style.notifications}>
          <NotificationsChangeForm />
        </div>
      </div>
    </div>
  );
};
