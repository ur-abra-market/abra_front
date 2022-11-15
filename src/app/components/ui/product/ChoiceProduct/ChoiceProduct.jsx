import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { input } from '../../../../store/reducers/productSlice'
import ProductQuantityControl from '../../../common/ProductQuantityControl'
import style from './ChoiceProduct.module.css'

const ChoiceProduct = () => {
  const colors = ['#828282', '#b9b9b9', '#cfcfcf', '#dddddd']
  const dispatch = useDispatch()
  const productData = useSelector(
    (state) => state.productPaginate.productActive
  )

  const price = +productData.info.value_price
  const quantity = +productData.info.quantity

  const max = useSelector((state) => state.product.max)
  const basket = useSelector((state) => state.basket.basketProduct)
  const product = basket.find(
    (obj) => obj.product_id === productData.product_id
  )
  const propsNew = product ? product : productData

  const discount = 0
  const amount = price * quantity
  const ship = 220
  const total = discount + ship

  return (
    <div className={style.choiceProduct}>
      <div className={style.choiceProduct__color}>
        <div className={style.choiceProduct__color_title}>Select color</div>
        <div className={style.choiceProduct__color_buttons}>
          {colors.map((background, i) => (
            <div
              className={style.choiceProduct__color_buttons_btn}
              key={`color-${i}`}
              style={{ background }}
            />
          ))}
        </div>
      </div>
      <div className={style.choiceProduct__quantity}>
        <div className={style.choiceProduct__quantity_block}>
          <div className={style.choiceProduct__quantity_title}>Quantity</div>
          <span
            className={style.choiceProduct__quantity_max}
            onClick={() => dispatch(input(max))}
          >
            /from {propsNew.info.quantity} pcs
          </span>
        </div>
        <ProductQuantityControl obj={propsNew} />
      </div>
      <div className={style.choiceProduct__price}>
        <div className={style.choiceProduct__price_item}>
          1pc<span> .......................................... </span>$
          {Math.floor(price) < price ? price.toFixed(2) : price}
        </div>
        <div className={style.choiceProduct__price_discount}>
          {max}pc <span> ............................................ </span>$
          {Math.floor(discount) < discount ? discount.toFixed(2) : discount}
        </div>
        <div className={style.choiceProduct__price_amount}>
          {max}pc
          <span> ................................................... </span>$
          {Math.floor(amount) < amount ? amount.toFixed(2) : amount}
        </div>
        <div className={style.choiceProduct__price_ship}>
          Shipping{' '}
          <span> ................................................. </span>$
          {Math.floor(ship) < ship ? ship.toFixed(2) : ship}
        </div>
        <div className={style.choiceProduct__price_total}>
          <h4>Total</h4>{' '}
          <h4>${Math.floor(total) < total ? total.toFixed(2) : total}</h4>
        </div>
      </div>
    </div>
  )
}

export default ChoiceProduct
