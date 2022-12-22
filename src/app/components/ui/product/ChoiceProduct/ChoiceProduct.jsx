import React from 'react'
import {  useSelector } from 'react-redux'
import ProductQuantityControl from '../../../common/ProductQuantityControl'
import style from './ChoiceProduct.module.css'
import PropTypes from 'prop-types'

const ChoiceProduct = ({colors}) => {
  // const price = +productData.info.value_price
  // const quantity = +productData.info.quantity
  const price = 123
  const quantity = 1
  const product_id =  34
  const max = 100
  // const max = useSelector((state) => state.product.max)

  const basket = useSelector((state) => state.basket.basketProduct)
  // const product = basket.find(
  //   (obj) => obj.product_id === product_id
  // )
  // const propsNew = product ? product : productData
  const propsNew = basket.find(
      (obj) => obj.product_id === product_id
  )


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
          {/*<span*/}
          {/*  className={style.choiceProduct__quantity_max}*/}
          {/*  onClick={() => dispatch(input(max))}*/}
          {/*>*/}
          {/*  /from {propsNew?.info.quantity} pcs*/}
          {/*</span>*/}
          <span
              className={style.choiceProduct__quantity_max}
              onClick={() =>{}}
          >
            /from {100} pcs
          </span>
        </div>
        <ProductQuantityControl obj={propsNew} />
      </div>
      <div className={style.choiceProduct__price}>
        <div className={style.choiceProduct__price_item}>
          1pc<span className={style.choiceProduct__price_item_line} />$
          {Math.floor(price) < price ? price.toFixed(2) : price}
        </div>

        <div className={style.choiceProduct__price_item}>
          {max}pc <span className={style.choiceProduct__price_item_line} />
          {Math.floor(discount) < discount ? discount.toFixed(2) : discount}
        </div>

        <div className={style.choiceProduct__price_item}>
          {max}pc <span className={style.choiceProduct__price_item_line} />$
          {Math.floor(amount) < amount ? amount.toFixed(2) : amount}
        </div>

        <div className={style.choiceProduct__price_item}>
          Shipping{' '}<span className={style.choiceProduct__price_item_line} />$
          {Math.floor(ship) < ship ? ship.toFixed(2) : ship}
        </div>

        <div className={style.choiceProduct__price_total}>
          <div>Total</div>
          <div>${Math.floor(total) < total ? total.toFixed(2) : total}</div>
        </div>
      </div>
    </div>
  )
}

ChoiceProduct.propTypes = {
  colors: PropTypes.array.isRequired
}

export default ChoiceProduct
