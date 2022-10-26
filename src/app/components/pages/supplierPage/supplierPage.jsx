import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ButtonLink } from "../../common/buttons";
import NavBarUniversal from "../../ui/navBarUniversal";
import SupplierMenu from "./supplierMenu/supplierMenu";
import iconImage from "../../../assets/img/icons/icon-img.png";
import bellImg from "../../../assets/img/icons/notification-bell.png";
import arrowTriangleImg from "../../../assets/img/icons/check-arrow.png";
import style from "./supplierPage.module.css";
import SupplierSection from "./supplierSection/supplierSection";
import Select from "../../common/select";

import { useDispatch, useSelector } from "react-redux";
import { active } from "../../../store/reducers/paginateSlice";
import FooterForSupplierPart from "../../common/footerForSupplierPart";
import SupplierAccountMainPage from "./supplierAccountMainPage/supplierAccountMainPage";
import Loader from "../../common/Loader";
import { getCompanyInfoService } from "../../../store/reducers/supplierSlice";

const SupplierPage = () => {
  const [currentMenuItemID, setCurrentMenuItemID] = useState();
  const [isGetCompanyInfo, setIsGetCompanyInfo] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoading = useSelector((state) => state.supplier.loading);
  const companyInfo = useSelector((state) => state.supplier.companyInfo);

  useEffect(() => {
    dispatch(getCompanyInfoService());
    setIsGetCompanyInfo(true);
    setCurrentMenuItemID("MainPage");
  }, []);

  const handleMenuItemSelect = (sectionName) => {
    const sectionNameID = sectionName.split(" ")[0];
    setCurrentMenuItemID(sectionNameID);
    dispatch(active(1));
  };

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
    if (isGetCompanyInfo && !isLoading && !companyInfo?.name) {
      navigate("account-setup");
    }
  }, [isLoading]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {" "}
          <NavBarUniversal
            logo={
              <>
                <Link to="/">Abra</Link>
                <span className={style.verticalLine}></span>
                <span
                  className={style.supplierMainPagelink}
                  onClick={() => setCurrentMenuItemID("MainPage")}
                >
                  SUPPLIER
                </span>
              </>
            }
          >
            <Link to="/">
              <ButtonLink
                name="Avatar"
                src={bellImg}
                classes={navbarCategoryBtnClasses}
              />
            </Link>
            <Link to="/">
              <ButtonLink
                name="Avatar"
                src={iconImage}
                classes={navbarCategoryBtnClasses}
              />
            </Link>
            <Select
              defaultName={companyInfo?.name}
              img={arrowTriangleImg}
              options={["Name 1", "Name 2", "Name 3"]}
              classes={SelectBussinessClasses}
            />
          </NavBarUniversal>
          <div className={style.pageWrapper}>
            <SupplierMenu
              onMenuItemSelect={handleMenuItemSelect}
              selectedMenuItemID={currentMenuItemID}
            />
            {currentMenuItemID === "MainPage" ? (
              <SupplierAccountMainPage />
            ) : (
              <SupplierSection pageID={currentMenuItemID} />
            )}
            {/* <SupplierSection pageID={currentMenuItemID} /> */}
          </div>
          <FooterForSupplierPart />
        </>
      )}
    </>
  );
};

export default SupplierPage;
