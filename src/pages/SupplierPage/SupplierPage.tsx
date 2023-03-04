import React, { useEffect, useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';

import arrowTriangleImg from '../../assets/img/icons/check-arrow.png';
import iconImage from '../../assets/img/icons/icon-img.png';
import bellImg from '../../assets/img/icons/notification-bell.svg';
import { ButtonLink } from '../../components/buttons';
import FooterForSupplierPart from '../../components/FooterForSupplierPart';
import Loader from '../../components/Loader';
import Select from '../../components/Select';
import NavBarUniversal from '../../components/ui/NavBarUniversal/NavBarUniversal';
import SupplierMenu from '../../components/ui/SupplierMenu/SupplierMenu';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getSupplierAccountDataService } from '../../store/reducers/supplierAccountSlice';
import { getCompanyInfoService } from '../../store/reducers/supplierSlice';

import style from './SupplierPage.module.css';

const SupplierPage = (): JSX.Element => {
  const [isGetCompanyInfo, setIsGetCompanyInfo] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(state => state.supplier.loading);
  const companyInfo = useAppSelector(state => state.supplier.companyInfo);

  useEffect(() => {
    dispatch(getCompanyInfoService());
    dispatch(getSupplierAccountDataService());
    setIsGetCompanyInfo(true);
  }, [dispatch]);

  const navbarCategoryBtnClasses = {
    wrepperBtnImg: `${style.wrepperBtnImg}`,
    btnImg: `${style.btnImg}`,
    btnName: `${style.btnName}`,
  };

  const SelectBussinessClasses = {
    selectWrapper: `${style.selectWrapper}`,
    select_headerWrapper: `${style.select_headerWrapper}`,
    select_header: `${style.select_header}`,
    select_options: `${style.select_options}`,
    option: `${style.option}`,
  };

  useEffect(() => {
    // @ts-ignore
    if (isGetCompanyInfo && !isLoading && !companyInfo?.name)
      navigate('../account-setup');
  }, [isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <NavBarUniversal
        logo={
          <>
            <Link className={style.text_link} to="/">
              Abra
            </Link>
            <span className={style.verticalLine} />
            <span>
              <Link className={style.supplierMainPagelink} to="/">
                {' '}
                SUPPLIER
              </Link>
            </span>
          </>
        }
      >
        <Link to="/">
          <ButtonLink name="Avatar" src={bellImg} classes={navbarCategoryBtnClasses} />
        </Link>
        <Link to="/">
          {
            // @ts-ignore
            companyInfo?.logo_url ? (
              <div className={style.logoImg}>
                <img
                  src={
                    // @ts-ignore
                    companyInfo.logo_url
                  }
                  alt="logo"
                />
              </div>
            ) : (
              <ButtonLink
                name="logoImg"
                src={iconImage}
                classes={navbarCategoryBtnClasses}
              />
            )
          }
        </Link>
        <Select
          defaultValue={
            // @ts-ignore
            companyInfo?.name
          }
          img={arrowTriangleImg}
          options={[
            'Name 1',
            'Name 2',
            `${
              // @ts-ignore
              companyInfo?.name
            }`,
          ]}
          classes={SelectBussinessClasses}
        />
      </NavBarUniversal>
      <div className={style.pageWrapper}>
        <SupplierMenu />
        <Outlet />
      </div>
      <FooterForSupplierPart />
    </>
  );
};

export default SupplierPage;
