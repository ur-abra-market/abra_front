import React from 'react'
import ProductCanvas from '../ProductCanvas'
import style from './ProductStatistics.module.css'

const ProductStatistics = () => {
  return (
    <div className={style.productStatistics}>
      <div className={style.productStatistics__basic}>
        <div className={style.productStatistics__demend}>
          <div className={style.productStatistics__demend_parameter}>
            Actual demand
          </div>
          <div className={style.productStatistics__demend_value}>100pc/day</div>
          <div className={style.productStatistics__demend_note}>
            *Average number for a weekly period
          </div>
        </div>
        <div className={style.productStatistics__demend}>
          <div className={style.productStatistics__demend_parameter}>
            Sale period/100 pc
          </div>
          <div className={style.productStatistics__demend_value}>11 days</div>
          <div className={style.productStatistics__demend_note}>
            *Average repurchase interval per user
          </div>
        </div>
      </div>
      <div className={style.productStatistics__price}>
        <div className={style.productStatistics__price_change}>
          Price changes
        </div>
        <div className={style.productStatistics__price_range}>
          from $8.50 up to $9.99
        </div>
      </div>
      <ProductCanvas />
      <div className={style.productStatistics__condition}>
        <div>Special offer: ≥ 100 = 1pc/$7.80</div>
        <div>Processing time: 14 day</div>
        <div>Estimated delivery: 27.07.2022</div>
      </div>
    </div>
  )
}

export default ProductStatistics
