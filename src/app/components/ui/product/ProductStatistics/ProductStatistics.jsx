import React from 'react'
import ProductCanvas from '../ProductCanvas'
import style from './ProductStatistics.module.css'
import PropTypes from 'prop-types'
import {Sizes} from './Sizes/Sizes'

const ProductStatistics = ({dailyActualDemand, prices, monthlyActualDemand, sizes}) => {
    // const {min_quantity, value} = prices

    const unitPrice = (prices?.value / prices?.min_quantity).toFixed(2)
    console.log(unitPrice)

    return (
        <div className={style.productStatistics}>
            <div className={style.sizes}>
                <div className={style['sizes-title']}>
                    Select size
                </div>
                <Sizes sizes={sizes}/>
            </div>
            <div className={style.productStatistics__basic}>
                <div className={style.productStatistics__demend}>
                    <div className={style.productStatistics__demend_parameter}>
                        Actual demand
                    </div>
                    <div className={style.productStatistics__demend_value}>
                        <span>{monthlyActualDemand}</span>pc/mo
                    </div>
                    <div className={style.productStatistics__demend_note}>
                        *Average number for a monthly period
                    </div>
                </div>
                <div className={style.productStatistics__demend}>
                    <div className={style.productStatistics__demend_parameter}>
                        Sold per day
                    </div>
                    <div className={style.productStatistics__demend_value}>
                        <span>{dailyActualDemand}</span> pc
                    </div>
                    <div className={style.productStatistics__demend_note}>
                        *Average sales per day
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
            <ProductCanvas/>
            {/*<div className={style.productStatistics__condition}>*/}
            {/*  <div>Special offer: ≥ <span>{min_quantity}</span> = 1pc/$<span>{unitPrice}</span></div>*/}
            {/*  <div>Processing time: 14 day</div>*/}
            {/*  <div>Estimated delivery: 27.07.2022</div>*/}
            {/*</div>*/}
        </div>
    )
}

ProductStatistics.propTypes = {
    dailyActualDemand: PropTypes.number.isRequired,
    monthlyActualDemand: PropTypes.number.isRequired,
    prices: PropTypes.object,
    sizes: PropTypes.array.isRequired,
}

export default ProductStatistics
