import React, { useState } from 'react'
import Flag from '../Flag';
import './ImgSlider.css'

const ImgSlider = ({srcArr}) => {
  //const photos = ['./assets/image/products/1.png', './assets/image/products/2.png', './assets/image/products/3.png', './assets/image/products/4.png'] 
  //const arrPhoto = [...photos.slice(-1), ...photos, photos[0]];
  const [slide, setSlide] = useState(0);
  const pos = 0 - (slide * 100);
  const images = () => {
    if (!srcArr.length) {
      return (
        <div className='ImgSlider__window_list' style={{marginLeft: '0%'}} >
          <img className='ImgSlider__window_list-img' src='./assets/image/none.png' alt="img" />              
        </div>
      )
    } else {
        <div className='ImgSlider__window_list' style={{marginLeft: `${pos}%`}} >          
          {srcArr.map((src, i) => (
            <img className='ImgSlider__window_list-img' key={`card_slide_${i}`} src={src} alt="img" />
          ))}          
        </div>
    }
  }
  const control = () => {
    if (srcArr.length > 1) {
      return (
        <div className='ImgSlider_control'>
        {srcArr.map((_, i) => (
          <div className='ImgSlider_control_slide'
            key={`card_photo_${i}`}
            onClick={() => setSlide(i)}
            style={{background: i===slide ? '#000000': '#828282'}} />
        ))}          
        </div>
      )
    } else {
        <div className='ImgSlider_control'></div>
    }
  }
  
  return (
    <div className='ImgSlider'>
      <div className='ImgSlider__window'>
        <Flag />
        {images()}        
      </div>  
      {control()}   
    </div>
  )
}

export default ImgSlider