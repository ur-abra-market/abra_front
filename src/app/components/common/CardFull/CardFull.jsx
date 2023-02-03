import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { active } from '../../../store/reducers/productPaginateSlice'
import { changeById } from '../../../store/reducers/basketSlice'
import { BtnNewBest } from '../buttons'
import ProductQuantityControl from '../ProductQuantityControl'
import Stars from '../Stars'
import style from './CardFull.module.css'
import ProductPath from '../../ui/product/ProductPath'
import ProductPrice from '../../ui/product/ProductPrice'
import SupplierCard from '../../ui/product/SupplierCard'
import ImgSlider from '../ImgSlider'

const CardFull = ({ props }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const basket = useSelector((state) => state.basket.basketProduct)
  const product = basket.find((obj) => obj.product_id === props.product_id)

  const [sum, setSum] = useState(0)
  const propsNew = product ? product : { ...props, ...{ sum } }

  const style1 = { flexDirection: 'row', alignItems: 'flex-end', gap: '0px' }
  const style2 = {
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '8px'
  }

  const handlerBasket = () => {
    setSum(propsNew.info.min_quantity)
    propsNew.sum = propsNew.info.min_quantity
    const newObj = propsNew
    dispatch(changeById({ newObj }))
  }

  return (
    <div className={style.cardFull}>
      <ImgSlider srcArr={propsNew.images} />
      <div className={style.cardFull__info}>
        <div className={style.cardFull__block1}>
          <div className={style.cardFull__direction}>
            <h4
              onClick={() => {
                navigate('../product')
                dispatch(active(propsNew))
              }}
            >
              {propsNew.info.name}
            </h4>
            <BtnNewBest name="Bestseller" />
          </div>
          <ProductPath />
        </div>
        <div className={style.cardFull__block2}>
          <div
            className={style.cardFull__price_stars}
            style={propsNew.sum === 0 ? style1 : style2}
          >
            <ProductPrice
              price={propsNew.info.value_price}
              quantity={propsNew.info.min_quantity}
            />
            <div className={style.cardFull__stars_reviews}>
              <Stars reward={+propsNew.info.grade_average} />
              <span>{`/${propsNew.info.total_reviews} reviews`}</span>
            </div>
          </div>
          <div
            className={style.cardFull__orders}
          >{`${propsNew.info.total_orders} Orders`}</div>
        </div>
        <div className={style.cardFull__block3}>
          {propsNew.sum > 0 ? (
            <ProductQuantityControl obj={propsNew} />
          ) : (
            <div
              className={style.cardFull__basket}
              onClick={() => handlerBasket()}
            >
              <div />
            </div>
          )}
          {propsNew.supplier ? <SupplierCard supplier={propsNew.supplier} /> : <></>}
        </div>
      </div>
    </div>
  )
}

export default CardFull
