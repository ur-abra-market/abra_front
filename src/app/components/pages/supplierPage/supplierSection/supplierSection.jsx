import React from 'react';
import PropTypes from 'prop-types';
import style from './supplierSection.module.css'
import BusinessProfile from '../businessPrifile/businessPrifile';
import Dashboard from '../dashboard';
import CardCatalog from '../cardCatalog';
import Analytics from '../analytics';
import PriceManagement from '../priceManagement';
import Orders from '../orders';
import FeedbackAndQuestions from '../feedbackAndQuestions';
import ManageProducts from '../manageProducts/manageProduct';

const SupplierSection = ({pageID}) => {

    const sectionsArray = [
        <BusinessProfile/>,
        <Dashboard/>,
        <CardCatalog/>,
        <ManageProducts/>,
        <Analytics/>,
        <PriceManagement/>,
        <Orders/>,
        <FeedbackAndQuestions/>
    ]

    const detachmentId = (section) => {
        return section.type.name.split(/(?=[A-Z])/)[0]
    }

    const renderSection = (pageID, sectionsArray ) => {
        for (let i = 0; i <  sectionsArray.length; i++) {
            if (  detachmentId(sectionsArray[i]) === pageID) {
                return <>{sectionsArray[i]}</>;
            }
        }
        return false;
    }

    return (
        <div className={style.sectionWrapper}>
            {renderSection(pageID, sectionsArray)}
        </div>
    )
}

SupplierSection.propTypes = {
    pageID: PropTypes.string,
    onSectionChange: PropTypes.func
  };

export default SupplierSection;