import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import Card from '../Card'
import style from './Slider.module.css'

const Slider = ({ title }) => {
  const dataArr = useSelector(
    (state) => state.productPaginate.dataProductPaginate
  )
  const widthCart = 220
  const gap = 11
  const step = widthCart + gap
  const widthList = dataArr.length * widthCart + (dataArr.length - 1) * gap
  const widthSlider = 1376
  const dl = widthSlider - widthList
  const [left, setLeft] = useState(0)

  const move = (d) => {
    const newleft = left + d
    const dLeft = newleft > 0 ? 0 : newleft < dl ? dl : newleft
    setLeft(dLeft)
  }

  return (
    <div className={style.slider}>
      <div className={style.slider__control}>
        <div className={style.slider__name}>
          <h2>{title}</h2>
          <span>See all</span>
        </div>
        <div className={style.slider__btn}>
          <div
            className={style.slider__btn_left}
            onClick={() => move(step)}
          ></div>
          <div
            className={style.slider__btn_right}
            onClick={() => move(-step)}
          ></div>
        </div>
      </div>
      <div className={style.slider__card}>
        <div className={style.slider__card_list} style={{ left: `${left}px` }}>
          {dataArr.map((data, index) => (
            <Card key={`card_${index}`} props={data} />
          ))}
        </div>
      </div>
    </div>
  )
}

Slider.propTypes = {
  title: PropTypes.string
}
export default Slider
