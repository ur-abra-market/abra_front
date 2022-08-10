import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ButtonLink } from '../../common/buttons';
import DownloadReportSection from '../../pages/supplierPage/chooseBusinessName-and-downloadReport-section';
import NavBarUniversal from '../../ui/navBarUniversal';
import SupplierMenu from './supplierMenu/supplierMenu';
import iconImage from "../../../assets/img/icons/icon-img.png";
import logOut from "../../../assets/img/icons/ligIn-logOut.svg";
import style from "./supplierPage.module.css"
import SupplierSection from './supplierSection/supplierSection';

const SupplierPage = (params) => {
    const [currentMenuItemID, setcurrentMenuItemID] = useState();
    // const [currentSectionID, setCurrentSectionID] = useState("Business");
    useEffect(() => {
        setcurrentMenuItemID("Business");
    }, []);

    // useEffect(() => {
    //     setCurrentSectionID("Business");
    // }, [currentMenuItemID]);

    const handleMenuItemSelect = (sectionName) => {
        const sectionNameID = sectionName.split(' ')[0]
        setcurrentMenuItemID(sectionNameID);
    };

    const navbarCategoryBtnClasses = {
        wrepperBtnImg: `${style.wrepperBtnImg}`,
        btnImg: `${style.btnImg}`,
        btnName: `${style.btnName}`,
    };

    return (
        <div className={style.pageWrapper}>
            <NavBarUniversal
                logo={
                    <>
                        <Link to="/">Abra</Link>
                        <span className={style.verticalLine}></span>
                        <span>SUPPLIER</span>
                    </>
                }
            >
                <Link className={style.wrepperButtonLink} to="/">
                    <ButtonLink
                    name="Notifications"
                    src={iconImage}
                    classes={navbarCategoryBtnClasses}
                    key="Notifications"
                    />
                </Link>
                <Link className={style.wrepperButtonLink} to="/">
                    <ButtonLink
                    name="Log Out"
                    src={logOut}
                    classes={navbarCategoryBtnClasses}
                    key="LogOut"
                    />
                </Link>
                
            </NavBarUniversal>
            <DownloadReportSection/>
            <div className={style.contentPageWrapper}>
                <SupplierMenu 
                    onMenuItemSelect={handleMenuItemSelect}
                    selectedMenuItemID={currentMenuItemID}
                    />
                <SupplierSection 
                    pageID={currentMenuItemID}
                />

            </div>
        </div>
    )
}

export default SupplierPage;
