import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { priceTo, priceFrom } from '../../../../store/reducers/filterSlice'
import { productPaginateService } from '../../../../store/reducers/productPaginateSlice'
import SwitchBox from '../../../common/SwitchBox'
import style from './FilterPrice.module.css'

const FilterPrice = () => {
  const dispatch = useDispatch()
  const filter = useSelector((state) => state.filter)
  const paginate = useSelector((state) => state.paginate)
  const data = { ...paginate, ...filter }

  const handlerPriceFrom = (value) => {
    dispatch(priceFrom(+value))
    dispatch(productPaginateService(data))
  }

  const handlerPriceTo = (value) => {
    dispatch(priceTo(+value))
    dispatch(productPaginateService(data))
  }

  return (
    <div className={style.filterPrice}>
      <h4>Price, $</h4>
      <div className={style.filterPrice__range}>
        <div className={style.filterPrice__range_from}>
          <div className={style.filterPrice__range_from_text}>From</div>
          <input
            className={style.filterPrice__range_from_input}
            type="number"
            value={filter.price_from}
            onChange={(e) => handlerPriceFrom(+e.target.value)}
          />
        </div>
        <div className={style.filterPrice__range_to}>
          <div className={style.filterPrice__range_to_text}>Up To</div>
          <input
            className={style.filterPrice__range_to_input}
            type="number"
            value={filter.price_to}
            onChange={(e) => handlerPriceTo(+e.target.value)}
          />
        </div>
      </div>
      <SwitchBox label={'Only discounted items'} />
    </div>
  )
}

export default FilterPrice
