import React from 'react'
import PropTypes from 'prop-types'
import style from './supplierSection.module.css'
import Dashboard from '../dashboard'
import Analytics from '../analytics'
import PriceManagement from '../priceManagement'
import Orders from '../orders'
import FeedbackAndQuestions from '../feedbackAndQuestions'
import ProductsList from '../productsList/productsList'

const SupplierSection = ({ pageID }) => {
  const sectionsArray = [
    <Dashboard />,
    <ProductsList />,
    <Orders />,
    <PriceManagement />,
    <Analytics />,
    <FeedbackAndQuestions />
  ]

  const detachmentId = (section) => {
    return section.type.name.split(/(?=[A-Z])/)[0]
  }

  const renderSection = (pageID, sectionsArray) => {
    for (let i = 0; i < sectionsArray.length; i++) {
      if (detachmentId(sectionsArray[i]) === pageID) {
        return <>{sectionsArray[i]}</>
      }
    }
    return false
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
}

export default SupplierSection
