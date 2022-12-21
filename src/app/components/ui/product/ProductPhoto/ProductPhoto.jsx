import React, { useState, useEffect } from 'react'
import style from './ProductPhoto.module.css'
import PropTypes from 'prop-types'

//const baseurl = './assets/image/products'
//const photoAll = ['1.png', '2.png', '3.png', '4.png', '5.png', '6.png', '7.png']

const ProductPhoto = ({photoArray}) => {
  const step = 114

  const [len, setLen] = useState(0)
  const [count, SetCount] = useState(0)
  const [height, SetHeight] = useState(step * 5 - 8)
  const [top, SetTop] = useState(-step)
  const [transition, SetTransition] = useState('0.5s')

  const slides = [photoArray[len - 1], ...photoArray, photoArray[0]]
  const slidesHalf1 = slides.slice(len - count, len + 1)
  const slidesHalf2 = slides.slice(1, len + 1)

  useEffect(() => {
    setLen(photoArray.length)
    const amountSlide = photoArray.length < 6 ? photoArray.length - 1 : 5
    SetHeight(amountSlide * step - 8)
  }, [])

  const moveDown = () => {
    SetTransition('0.5s')
    SetTop(-(2 * step))
  }

  const moveUp = () => {
    SetTransition('0.5s')
    SetTop(0)
  }

  const change = () => {
    SetTransition('none')
    if (top === 0) SetCount(count === len - 1 ? 0 : count + 1)
    if (top < -step) SetCount(count === 0 ? len - 1 : count - 1)
    SetTop(-step)
  }

  return (
    <div className={style.productPhoto}>
      <div className={style.photo__slider}>
        <div className={style.photo__slider_btn_up} onClick={moveUp} />
        <div className={style.photo__slider_slides} style={{ height }}>
          <div
            className={style.photo__slider_list}
            style={{ top, transition }}
            onTransitionEnd={change}
          >
            {slidesHalf1.map((p, index) => (
              <img
                className={style.photo__slider_slide}
                key={`${p}-${index}`}
                // src={`${baseurl}/${p}`}
                src={p?.image_url}
                alt="product"
              />
            ))}
            {slidesHalf2.map((p, index) => (
              <img
                className={style.photo__slider_slide}
                key={`${p}-${index}`}
                // src={`${baseurl}/${p}`}
                src={p?.image_url}
                alt="product"
              />
            ))}
          </div>
        </div>
        <div className={style.photo__slider_btn_down} onClick={moveDown} />
      </div>
      <div className={style.photo__image}>
        {/*<img src={`${baseurl}/${slides[len + 1 - count]}`} alt="ptoduct" />*/}
        <img src={`${slides[len + 1 - count]?.image_url}`} alt="product" />
      </div>
    </div>
  )
}

ProductPhoto.propTypes = {
  photoArray: PropTypes.array.isRequired
}

export default ProductPhoto
