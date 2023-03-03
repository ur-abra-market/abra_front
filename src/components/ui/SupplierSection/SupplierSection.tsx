import React, { FC } from 'react';

import PropTypes from 'prop-types';

// import Analytics from '../analytics';
// import Dashboard from '../dashboard';
// import FeedbackAndQuestions from '../feedbackAndQuestions';
// import Orders from '../orders';
// import PriceManagement from '../priceManagement';
// import ProductsList from '../productsList/productsList';

import style from './SupplierSection.module.css';

interface SupplierSectionProps {
  pageID: string;
  // onSectionChange?: string;
}
// TODO нет импортов !!! разобраться
const SupplierSection: FC<SupplierSectionProps> = ({ pageID }) => {
  const sectionsArray: any[] = [
    // <Dashboard />,
    // <ProductsList />,
    // <Orders />,
    // <PriceManagement />,
    // <Analytics />,
    // <FeedbackAndQuestions />,
  ];

  const detachmentId = (section: any) => {
    return section.type.name.split(/(?=[A-Z])/)[0];
  };

  const renderSection = (pageID: any, sectionsArray: any[]) => {
    for (let i = 0; i < sectionsArray.length; i++) {
      if (detachmentId(sectionsArray[i]) === pageID) {
        return <>{sectionsArray[i]}</>;
      }
    }

    return false;
  };

  return (
    <div className={style.sectionWrapper}>{renderSection(pageID, sectionsArray)}</div>
  );
};

export default SupplierSection;
