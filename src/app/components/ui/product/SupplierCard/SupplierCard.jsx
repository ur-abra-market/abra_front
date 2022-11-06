import React from 'react'
import PropTypes from 'prop-types'
import style from './SupplierCard.module.css'

const SupplierCard = ({ supplier }) => {
  return (
    <div className={style.supplierCard}>
      <div className={style.supplierCard__avatar} />
      <div className={style.supplierCard__info}>
        <div className={style.supplierCard__info_name}>{supplier?.name}</div>
        <div
          className={style.supplierCard__info_deals}
        >{`${supplier?.period} Years : ${supplier?.count} Deals : On-time delivery ${supplier?.value}%`}</div>
      </div>
      <div className={style.supplierCard__arrow} />
    </div>
  )
}

SupplierCard.propTypes = {
  supplier: PropTypes.object
}

export default SupplierCard
