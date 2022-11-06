import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Flag from '../Flag'
import style from './ImgSlider.module.css'

const ImgSlider = ({ srcArr }) => {
  //const photos = ['./assets/image/products/1.png', './assets/image/products/2.png', './assets/image/products/3.png', './assets/image/products/4.png']
  //const arrPhoto = [...photos.slice(-1), ...photos, photos[0]];
  const [slide, setSlide] = useState(0)
  const pos = 0 - slide * 100
  const images = () => {
    if (!srcArr.length) {
      return (
        <div
          className={style.imgSlider__window_list}
          style={{ marginLeft: '0%' }}
        >
          <img
            className={style.imgSlider__window_list_img}
            src="./assets/image/none.png"
            alt="img"
          />
        </div>
      )
    } else {
      return (
        <div
          className={style.imgSlider__window_list}
          style={{ marginLeft: `${pos}%` }}
        >
          {srcArr.map((src, i) => (
            <img
              className={style.imgSlider__window_list_img}
              key={`card_slide_${i}`}
              src={src.image_url}
              alt="img"
            />
          ))}
        </div>
      )
    }
  }
  const control = () => {
    if (srcArr.length > 1) {
      return (
        <div className={style.imgSlider_control}>
          {srcArr.map((_, i) => (
            <div
              className={style.imgSlider_control_slide}
              key={`card_photo_${i}`}
              onClick={() => setSlide(i)}
              style={{ background: i === slide ? '#000000' : '#828282' }}
            />
          ))}
        </div>
      )
    } else return <div className={style.imgSlider_control}></div>
  }

  return (
    <div className={style.imgSlider}>
      <div className={style.imgSlider__window}>
        <Flag />
        {images()}
      </div>
      {control()}
    </div>
  )
}
ImgSlider.propTypes = { srcArr: PropTypes.array }

export default ImgSlider
