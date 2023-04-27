import React, { useEffect } from 'react';

import { Outlet } from 'react-router-dom';

import Loader from '../../components/Loader';
import { Status } from '../../enums/status.enum';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getSupplierAccountDataService,
  getSupplierNotifications,
} from '../../store/reducers/supplierAccountSlice';
import { getCompanyInfoService } from '../../store/reducers/supplierSlice';

import { SupplierLayout } from 'layouts/SupplierLayout/SupplierLayout';

const SupplierPage = (): JSX.Element => {
  // const [isGetCompanyInfo, setIsGetCompanyInfo] = useState(false);

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();
  const isLoading = useAppSelector(state => state.supplierAccount.isLoading);
  // const supplierInfo = useAppSelector(state => state.supplierAccount.supplierInfo);

  useEffect(() => {
    dispatch(getCompanyInfoService());
    dispatch(getSupplierAccountDataService());
    dispatch(getSupplierNotifications());
    // setIsGetCompanyInfo(true);
  }, [dispatch]);

  // useEffect(() => {
  //   if (isGetCompanyInfo && isLoading && !supplierInfo) navigate('../account-setup');
  // }, [supplierInfo, isGetCompanyInfo, isLoading, navigate]);

  if (isLoading === Status.Loading) {
    return <Loader />;
  }

  return (
    <SupplierLayout>
      <Outlet />
    </SupplierLayout>
  );
};

export default SupplierPage;
