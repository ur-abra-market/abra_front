import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { FormProvider, useForm } from 'react-hook-form';

import { AccountManagement } from '../../../../components';
import {
  ISupplierBusinessInfoFormValues,
  SupplierBusinessInfoForm,
  supplierBusinessInfoFormValidationSchema,
} from '../../supplier-pages-common';

import { SupplierNotifications } from './SupplierNotifications/SupplierNotifications';
import style from './SupplierProfilePage.module.scss';

import { SupplierPersonalInfoChangeForm } from './index';

export const SupplierProfilePage = (): JSX.Element => {
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
          <SupplierNotifications />
        </div>
      </div>
    </div>
  );
};
